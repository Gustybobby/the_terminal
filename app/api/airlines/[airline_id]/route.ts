import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils";
import { FACTION_MAP } from "@/game/faction";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            passengers: true,
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
                    unitTime: true,
                    effects: {
                        where: {
                            to: {
                                gte: new Date()
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
    const classEffectCount = airline.applyEffects.filter((effect) => effect.type === airline.class).length
    return NextResponse.json({ message: "SUCCESS", data: {
        ...airline,
        stock: FACTION_MAP[airline.class].use - classEffectCount,
        allAirlines,
    } }, { status: 200 })
}

export async function PATCH(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? "",
            airlineRole: "Co_pilot",
        }
    })
    const request = await req.json()
    const { class: airlineClass } = request.data
    const updateClass = await prisma.airline.update({
        where: {
            id: +params.airline_id
        },
        data: {
            class: airlineClass
        }
    })
    console.log(updateClass)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}