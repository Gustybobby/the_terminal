import prisma from "@/prisma-client";

const GAME_ID = "game0"

async function updateGameClock(){
    const now = new Date()
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            clock: true
        }
    })
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
    const { clock, prevClock, updated } = await updateGameClock()
    if(!updated){
        return
    }
    const terminals = await prisma.terminal.findMany({
        where: {
            NOT: {
                capturedBy: null
            },
            unitTime: {
                gte: (clock.getTime() - prevClock.getTime())/1000
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
    for(const terminal of terminals){
        const update = terminal.passengerRate*(clock.getTime() - terminal.lastPassengerUpdate.getTime())/(terminal.unitTime*1000)
        const updatedAmount = (terminal.capturedBy?.passengers ?? 0) + update
        const updatedTerminal = await prisma.terminal.update({
            where: {
                id: terminal.id
            },
            data: {
                lastPassengerUpdate: clock,
            }
        })
        const updatedAirline = await prisma.airline.update({
            where: {
                id: terminal.capturedBy?.id ?? 0,
            },
            data: {
                passengers: updatedAmount
            }
        })
        console.log(updatedTerminal.lastPassengerUpdate, updatedAirline.passengers)
    }
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

