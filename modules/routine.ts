import prisma from "@/prisma-client";

export const GAME_ID = "game0"

async function updateGameClock(){
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            clock: true,
            pause: true,
            phase: true,
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
        return { clock: updateClock.clock, prevClock: gameState.clock, updated: true, phase: gameState.phase }
    }
    return { clock: gameState.clock, prevClock: gameState.clock, updated: false, phase: gameState.phase }
}

export async function passengerUpdate(){
    const gameState = await updateGameClock()
    if(!gameState){
        return
    }
    const { clock, updated, phase } = gameState
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
                    passengers: true,
                    class: true,
                }
            },
            capturedByRecords: {
                take: 1
            }
        }
    })
    const effects = await prisma.effect.findMany({
        where: {
            from: {
                lte: new Date()
            },
            to: {
                gte: new Date()
            }
        },
        select: {
            type: true,
            applyById: true,
            applyToId: true,
            terminalId: true,
        }
    })
    const pStart: { [id: string]: number } = {}
    const pCount: { [id: string]: number } = {}
    const updatedTerminals: { id: number }[] = []
    for(const terminal of terminals){
        const terminalEffects = effects.filter((effect) => effect.terminalId === terminal.id)
        //half interval for MSME limit >= 5s
        let modTime = terminal.unitTime*1000
        for(const effect of terminalEffects){
            switch(effect.type){
                case "MSME":
                    modTime = Math.max(5000, modTime/2)
                    console.log("MSME modify intervals", modTime)
            }
        }
        if(terminal.capturedBy?.class === "CET" && !effects.find((effect) => effect.applyById === terminal.capturedBy?.id)){
            const capturedAt = terminal.capturedByRecords[0]?.capturedAt ?? clock
            if(clock.getTime() - capturedAt.getTime() >= Math.floor(configValue.CETDurationReq*phase*10*60*1000)){
                await prisma.effect.create({
                    data: {
                        applyById: terminal.capturedBy.id,
                        applyToId: terminal.capturedBy.id,
                        terminalId: terminal.id,
                        type: "CET",
                        from: clock,
                        to: new Date(clock.getTime()+100*10*60*1000)
                    }
                })
                console.log("50% of phase passed, applying passive buff")
            }   
        }
        const timeDiff = clock.getTime() - terminal.lastPassengerUpdate.getTime()
        if(timeDiff < modTime){
            continue
        }
        updatedTerminals.push({ id: terminal.id })
        const update = terminal.passengerRate*Math.floor(timeDiff/modTime)
        //modify terminal update for MT case 2 and CET passive condition
        let modUpdate = update
        for(const effect of terminalEffects){
            switch(effect.type){
                case "MT":
                case "CET":
                    modUpdate = modUpdate*3
            }
        }
        const stringId = String(terminal.capturedBy?.id) ?? ""
        pStart[stringId] = terminal.capturedBy?.passengers ?? 0
        pCount[stringId] = pCount[stringId] === undefined? 0 : pCount[stringId]
        pCount[stringId] += modUpdate
    }
    for(const [ id, count ] of Object.entries(pCount)){
        const recievedEffects = effects.filter((effect) => effect.applyToId === +id)
        //modify total passenger rate
        let modCount = count
        for(const effect of recievedEffects){
            switch(effect.type){
                case "ICT":
                    modCount = Math.floor(modCount*0.8)
            }
        }
        const updatedAirline = await prisma.airline.update({
            where: {
                id: +id
            },
            data: {
                passengers: pStart[id] + modCount
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

const configValue = {
    CETDurationReq: 0.5
}

