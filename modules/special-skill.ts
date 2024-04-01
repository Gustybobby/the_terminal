import { FACTION_MAP } from "@/game/faction"
import prisma from "@/prisma-client"
import { GAME_ID, TICKUNIT } from "./routine"

export default async function specialSkill(
    airlineId: number,
    applyToId: number | undefined,
    terminalId: number | undefined,
    option: number | undefined
){
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: airlineId
        },
        select: {
            class: true,
            skillUse: true,
        }
    })
    if(FACTION_MAP[airline.class].use - airline.skillUse <= 0){
        throw "ran out of uses"
    }
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            currentTick: true,
            phase: true,
        }
    })
    switch(airline.class){
        case "MSME":

    }
    let effect
    switch(airline.class){
        case "ICT":
            if(option !== 1){
                throw "Invalid option"
            }
            effect = await prisma.effect.create({
                data: {
                    type: airline.class,
                    fromTick: gameState.currentTick,
                    toTick: gameState.currentTick + tickPerPhase(gameState.phase)*FACTION_MAP[airline.class].duration_factor,
                    applyById: airlineId,
                    applyToId: applyToId ?? null,
                    multiplier: 0.8,
                    unitTick: 1,
                }
            })
            break
        case "MSME":
            if(option !== 1){
                throw "Invalid option"
            }
            const prevEffect1 = await prisma.effect.findMany({
                where: {
                    type: airline.class,
                    fromTick: { lte: gameState.currentTick },
                    toTick: { gte: gameState.currentTick },
                    applyById: airlineId
                }
            })
            if(prevEffect1.length > 0){
                throw "Effect is already active"
            }
            effect = await prisma.effect.create({
                data: {
                    type: airline.class,
                    fromTick: gameState.currentTick,
                    toTick: gameState.currentTick + tickPerPhase(gameState.phase)*FACTION_MAP[airline.class].duration_factor,
                    applyById: airlineId,
                }
            })
            break
        case "BCET":
            if(option === 1){
                const prevEffect2 = await prisma.effect.findMany({
                    where: {
                        type: airline.class,
                        fromTick: { lte: gameState.currentTick },
                        toTick: { gte: gameState.currentTick },
                        applyById: airlineId,
                        terminalId: terminalId,
                    }
                })
                if(prevEffect2.length > 0){
                    throw "Effect is already active"
                }
                effect = await prisma.effect.create({
                    data: {
                        type: airline.class,
                        fromTick: gameState.currentTick,
                        toTick: gameState.currentTick + tickPerPhase(1)/2, //5 mins
                        applyById: airlineId,
                        terminalId: terminalId,
                        multiplier: 0.5,
                        unitTick: 1,
                    }
                })
            } else if (option === 2){ //for staff
                effect = await prisma.effect.create({
                    data: {
                        type: airline.class,
                        fromTick: gameState.currentTick,
                        toTick: gameState.currentTick + 2, 
                        applyById: airlineId,
                        terminalId: terminalId,
                        multiplier: 1,
                        unitTick: 1,
                    }
                })
            }
            break
        case "MT":
            const ownerCheck = await prisma.terminal.findUnique({
                where: {
                    id: terminalId,
                    airlineId
                }
            })
            if(!ownerCheck){
                throw "cannot apply MT to this terminal due to not being an owner"
            }
            if(option === 1){
                effect = await prisma.effect.create({
                    data: {
                        type: airline.class,
                        fromTick: gameState.currentTick,
                        toTick: gameState.currentTick + tickPerPhase(1)/2, //5 mins
                        applyById: airlineId,
                        terminalId: terminalId,
                        multiplier: 3,
                        unitTick: 1,
                    }
                })
            } else if(option === 2){ //for staff
                effect = await prisma.effect.create({
                    data: {
                        type: airline.class,
                        fromTick: gameState.currentTick,
                        toTick: tickPerPhase(gameState.phase),
                        applyById: airlineId,
                        terminalId: terminalId,
                        multiplier: 0.9,
                        unitTick: 1,
                    }
                })
            }
            break
    }
    await prisma.airline.update({
        where: {
            id: airlineId
        },
        data: {
            skillUse: { increment: 1 }
        }
    })
    console.log("Airline", airlineId, "uses", FACTION_MAP[airline.class].ability_name)
    console.log({ applyToId, terminalId, option })
    console.log(effect)
}

const tickPerPhase = (phase: number) => phase*10*60*1000/TICKUNIT