import prisma from "@/prisma-client";

const GAME_ID = "game0"

async function updateGameClock(){
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            clock: true,
            pause: true,
        }
    })
    if(gameState.pause){
        return null
    }
    const now = new Date()
    if(now.getTime() - gameState.clock.getTime() >= 5000){
        const updateClock = await prisma.gameState.update({
            where: {
                id: GAME_ID
            },
            data: {
                clock: floorUnitDate(now)
            }
        })
        console.log("updated game clock",updateClock.clock)
        return { clock: updateClock.clock, prevClock: gameState.clock, updated: true }
    }
    return { clock: gameState.clock, prevClock: gameState.clock, updated: false }
}

export async function passengerUpdate(){
    const gameState = await updateGameClock()
    if(!gameState){
        return
    }
    const { clock, updated } = gameState
    if(!updated){
        return
    }
    const terminals = await prisma.terminal.findMany({
        where: {
            NOT: {
                capturedBy: null
            }
        },
        select: {
            id: true,
            lastPassengerUpdate: true,
            passengerRate: true,
            unitTime: true,
            capturedBy: {
                select: {
                    id: true,
                    passengers: true
                }
            },
        }
    })
    const pCount: { [id: string]: number } = {}
    const updatedTerminals: { id: number }[] = []
    for(const terminal of terminals){
        if(clock.getTime() - terminal.lastPassengerUpdate.getTime() < terminal.unitTime*1000){
            continue
        }
        const update = terminal.passengerRate*Math.floor((clock.getTime() - terminal.lastPassengerUpdate.getTime())/(terminal.unitTime*1000))
        updatedTerminals.push({ id: terminal.id })
        const stringId = String(terminal.capturedBy?.id) ?? ""
        pCount[stringId] = pCount[stringId] === undefined? (terminal.capturedBy?.passengers ?? 0) : pCount[stringId]
        pCount[stringId] += update
    }
    for(const [ id, count ] of Object.entries(pCount)){
        const updatedAirline = await prisma.airline.update({
            where: {
                id: +id
            },
            data: {
                passengers: count
            }
        })
        console.log(updatedAirline.passengers,"id:",updatedAirline.id)
    }
    await prisma.terminal.updateMany({
        where: {
            OR: updatedTerminals
        },
        data: {
            lastPassengerUpdate: clock
        }
    })
    //last update: Date
    //now - last > 5s, update
    //resume, last update <- now
    //pause date, resume date
    //lastupdate <- now - (pause - last update)
}

function floorUnitDate(date: Date){
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(), date.getSeconds() - date.getSeconds()%5
    )
}

