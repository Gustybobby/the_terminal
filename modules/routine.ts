import prisma from "@/prisma-client";
import type { AirlineGainData, TerminalGainRoutineData, TerminalUpdateData } from "@/types/routine-update";
import type { Effect } from "@prisma/client";
import classConfig from "./class-config";

export const GAME_ID = "game0"
export const TICKUNIT = 2000

async function updateGameClock(){
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            currentTick: true,
            pause: true,
            phase: true,
            lastTickUpdate: true,
        }
    })
    if(gameState.pause){
        return null
    }
    const now = new Date()
    //Tick only increments one at a time now
    if(now.getTime() - gameState.lastTickUpdate.getTime() >= TICKUNIT){
        const updateClock = await prisma.gameState.update({
            where: {
                id: GAME_ID
            },
            data: {
                lastTickUpdate: floorUnitDate(now),
                currentTick: { increment: 1 }
            }
        })
        console.log("updated game tick",updateClock.currentTick,"at",updateClock.lastTickUpdate)
        return { currentTick: updateClock.currentTick, updated: true, phase: gameState.phase }
    }
    return { currentTick: gameState.currentTick, updated: false, phase: gameState.phase }
}

export async function gameCycle(){
    const gameState = await updateGameClock()
    if(!gameState){
        return
    }
    const { currentTick, updated, phase } = gameState
    if(!updated){
        return
    }
    const terminals = await getTerminals()
    const effects = await getActiveEffects(currentTick)
    const gainData = calculateAllTerminalGains(terminals, currentTick, effects)
    const airlineGains = groupGainsByAirline(gainData)
    await applyGainToAirlines(airlineGains, effects, currentTick)
    await prisma.terminal.updateMany({
        where: {
            OR: Object.values(gainData).filter((data) => data.tickUpdated).map((data) => ({ id: data.terminalId }))
        },
        data: {
            lastUpdateTick: currentTick
        }
    })
    await effectCycle(terminals, effects, currentTick, phase)
}

async function getTerminals(): Promise<TerminalUpdateData[]>{
    const terminals = await prisma.terminal.findMany({
        where: {
            NOT: {
                capturedBy: null
            }
        },
        select: {
            id: true,
            lastUpdateTick: true,
            passengerRate: true,
            unitTick: true,
            capturedBy: {
                select: {
                    id: true,
                    passengers: true,
                    class: true,
                }
            },
            capturedByRecords: {
                orderBy: {
                    capturedAt: "desc"
                },
                take: 1
            }
        }
    })
    return terminals as TerminalUpdateData[]
}

async function getActiveEffects(currentTick: number){
    const effects = await prisma.effect.findMany({
        where: {
            fromTick: {
                lte: currentTick
            },
            toTick: {
                gte: currentTick
            }
        }
    })
    return effects
}

function calculateAllTerminalGains(terminals: TerminalUpdateData[], currentTick: number, effects: Effect[]){
    const gainData: { [id: string]: TerminalGainRoutineData } = {}
    for(const terminal of terminals){
        const terminalEffects = effects.filter((fx) => fx.terminalId === terminal.id)
        const gainRoutine = calculateTerminalGain(terminal, currentTick, terminalEffects)
        gainData[terminal.id] = gainRoutine
    }
    return gainData
}

function calculateTerminalGain(terminal: TerminalUpdateData, currentTick: number, terminalEffects: Effect[]): TerminalGainRoutineData{
    let gain = 0
    let tickUpdated = false
    const modifiedTick = getModifiedTick(terminal.unitTick, terminalEffects)
    if(currentTick - terminal.lastUpdateTick >= modifiedTick){
        gain += terminal.passengerRate
        tickUpdated = true
    }
    for(const fx of terminalEffects){
        if(fx.unitTick && (currentTick - fx.fromTick)%fx.unitTick === 0){
            gain = Math.floor((fx.multiplier ?? 1)*(( fx.flatRate ?? 0 ) + gain))
        }
        //extends special effects here
    }
    return {
        gain,
        airlineId: terminal.capturedBy.id,
        terminalId: terminal.id,
        tickUpdated,
    }
}

function getModifiedTick(originalTick: number, terminalEffects: Effect[]){
    let modTick = originalTick
    for(const fx of terminalEffects){
        if(fx.type === "MSME"){
            modTick = Math.max(modTick/4, 1)
        }
    }
    return modTick
}

function groupGainsByAirline(gainData: { [id: string]: TerminalGainRoutineData }){
    const airlineGains: { [id: string]: AirlineGainData } = {}
    for(const [terminalId, data] of Object.entries(gainData)){
        airlineGains[data.airlineId] = airlineGains[data.airlineId] ?? { terminals: {} }
        airlineGains[data.airlineId].terminals[terminalId] = data
    }
    return airlineGains
}

async function applyGainToAirlines(airlineGains: { [id: string]: AirlineGainData }, effects: Effect[], currentTick: number){
    for(const [id,data] of Object.entries(airlineGains)){
        const recievedEffects = effects.filter((fx) => fx.applyToId === +id)
        await applyGainToAirline(+id, data, recievedEffects, currentTick)
    }
}

async function applyGainToAirline(airlineId: number, data: AirlineGainData, recievedEffects: Effect[], currentTick: number){
    let gain = sumGains(data)
    let steal = 0
    for(const fx of recievedEffects){
        if(fx.unitTick && (currentTick - fx.fromTick)%fx.unitTick === 0){
            //steal passengers from ICT hack
            if(fx.type === "ICT"){
                steal = Math.round((1 - (fx.multiplier ?? 1))*gain)
                if(steal !== 0){
                    await prisma.airline.update({
                        where: {
                            id: fx.applyById,
                        },
                        data: {
                            passengers: { increment: steal }
                        }
                    })
                    console.log(fx.applyById,"stolen",steal,"out of",gain,"passengers")
                }
            }
            gain = Math.floor((fx.multiplier ?? 1)*(( fx.flatRate ?? 0 ) + gain))
        }
    }
    if(gain === 0){
        return
    }
    const airline = await prisma.airline.update({
        where: {
            id: airlineId
        },
        data: {
            passengers: { increment: gain }
        }
    })
    console.log(data.terminals)
    console.log("incremented",airline.title,"passengers by",gain,"current:",airline.passengers)
}

async function effectCycle(terminals: TerminalUpdateData[], effects: Effect[], currentTick: number, phase: number){
    for(const terminal of terminals){
        if(terminal.capturedBy.class === "CET" && terminal.capturedByRecords.length > 0){
            if(effects.find((fx) => fx.applyById === terminal.capturedBy.id && fx.terminalId === terminal.id)){
                continue
            }
            const capturedTick = terminal.capturedByRecords[0].capturedTick
            if(currentTick - capturedTick >= classConfig.CET.reqDurationScale*totalPhaseTick(phase)){
                const foundationMatters = await prisma.effect.create({
                    data: {
                        applyById: terminal.capturedBy.id,
                        terminalId: terminal.id,
                        fromTick: currentTick,
                        toTick: totalPhaseTick(phase),
                        multiplier: 3,
                        unitTick: 1,
                        type: "CET"
                    }
                })
                console.log("Applied passive",foundationMatters,"to",terminal.capturedBy.id,"terminal",terminal.id)
            }
        }
    }
}

const totalPhaseTick = (phase: number) => phase*10*60*1000/TICKUNIT

function sumGains(data: AirlineGainData){
    let sum = 0
    for(const terminalData of Object.values(data.terminals)){
        sum+=terminalData.gain
    }
    return sum
}

function floorUnitDate(date: Date){
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(), date.getSeconds() - date.getSeconds()%(TICKUNIT/1000)
    )
}

