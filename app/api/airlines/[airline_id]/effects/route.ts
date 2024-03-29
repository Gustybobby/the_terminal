import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { GAME_ID, TICKUNIT } from "@/modules/routine";
import { FACTION_MAP } from "@/game/faction";

export async function POST(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    if(session?.user.role === "USER"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 400 })
    }
    const request = await req.json()
    const { special, applyToId, terminalId, option } = request.data
    if(special){
        await specialSkill(+params.airline_id, applyToId, terminalId, option)
    }
    else if(session?.user.role === "ADMIN"){
        //handle custom buff
    }
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}

async function specialSkill(airlineId: number, applyToId: number | undefined, terminalId: number | undefined, option: number | undefined){
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: airlineId
        },
        select: {
            class: true,
            skillUse: true,
            captures: true,
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
        case "ICT":
            await prisma.effect.create({
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
            await prisma.effect.createMany({
                data: airline.captures.map((terminal) => ({
                    type: airline.class,
                    fromTick: gameState.currentTick,
                    toTick: gameState.currentTick + tickPerPhase(gameState.phase)*FACTION_MAP[airline.class].duration_factor,
                    applyById: airlineId,
                    terminalId: terminal.id,
                }))
            })
            break
        case "BCET":
            if(option === 1){
                await prisma.effect.create({
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
            }
            break
        case "MT":
            if(option === 1){
                await prisma.effect.create({
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
            } else if(option === 2){
                await prisma.effect.create({
                    data: {
                        type: airline.class,
                        fromTick: gameState.currentTick,
                        toTick: gameState.currentTick + 30,
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
}

const tickPerPhase = (phase: number) => phase*10*60*1000/TICKUNIT