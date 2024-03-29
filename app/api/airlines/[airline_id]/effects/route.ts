import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { GAME_ID, TICKUNIT } from "@/modules/routine";
import { FACTION_MAP } from "@/game/faction";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 400 })
    }
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            currentTick: true
        }
    })
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            id: true,
            recieveEffects: {
                where: {
                    fromTick: {
                        lte: gameState.currentTick
                    },
                    toTick: {
                        gte: gameState.currentTick
                    }
                }
            },
            applyEffects: {
                where: {
                    fromTick: {
                        lte: gameState.currentTick
                    },
                    toTick: {
                        gte: gameState.currentTick
                    }
                },
            }
        }
    })
    const effects = await prisma.effect.findMany({
        where: {
            type: "BCET",
            toTick: {
                gte: gameState.currentTick
            }
        }
    })
    const allEffects = (airline.recieveEffects).concat(effects).concat(airline.applyEffects)
    return NextResponse.json({ message: "SUCCESS", data: {
        allEffects,
        id: airline.id,
        currentTick: gameState.currentTick
    }}, { status: 200 })
}

export async function POST(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? ""
        },
        select: {
            airlineRole: true
        }
    })
    if(session?.user.role === "USER" && user.airlineRole !== "Co_pilot"){
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
            const prevEffect = await prisma.effect.findMany({
                where: {
                    type: airline.class,
                    fromTick: {
                        lte: gameState.currentTick
                    },
                    toTick: {
                        gte: gameState.currentTick
                    },
                    applyById: airlineId
                }
            })
            if(prevEffect.length > 0){
                console.log("Effect is already active")
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
            }
            break
        case "MT":
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
            } else if(option === 2){
                effect = await prisma.effect.create({
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
    console.log(effect)
}

const tickPerPhase = (phase: number) => phase*10*60*1000/TICKUNIT