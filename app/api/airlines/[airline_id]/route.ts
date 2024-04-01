import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils";
import { FACTION_MAP } from "@/game/faction";
import { GAME_ID } from "@/modules/routine";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
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
            passengers: true,
            airlineSecret: true,
            skillUse: true,
            crews: {
                select: {
                    airlineRole: true,
                    name: true,
                }
            },
            captures: {
                select: {
                    id: true,
                    title: true,
                    passengerRate: true,
                    unitTick: true,
                    effects: {
                        where: {
                            toTick: {
                                gte: gameState.currentTick
                            }
                        }
                    },
                },
                orderBy: {
                    id: "asc"
                }
            },
            class: true,
            applyEffects: {
                select: {
                    type: true
                }
            }
        }
    })
    const allAirlines = await prisma.airline.findMany({
        select: {
            id: true,
            title: true,
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: {
        ...airline,
        stock: FACTION_MAP[airline.class].use - airline.skillUse,
        allAirlines,
    } }, { status: 200 })
}

export async function PATCH(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? "",
            OR: [
                { role: "ADMIN" },
                { role: "STAFF" },
            ]
        }
    })
    const request = await req.json()
    const data = request.data
    const update = await prisma.airline.update({
        where: {
            id: +params.airline_id
        },
        data
    })
    console.log(update)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}