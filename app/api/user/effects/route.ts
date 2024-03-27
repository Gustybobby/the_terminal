import { NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils";
import { GAME_ID } from "@/modules/routine";

export const dynamic = "force-dynamic"

export async function GET(){
    const session = await getServerAuthSession()
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            currentTick: true
        }
    })
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? ""
        },
        select: {
            airline: {
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
    const allEffects = (user.airline?.recieveEffects ?? []).concat(effects).concat(user.airline?.applyEffects ?? [])
    return NextResponse.json({ message: "SUCCESS", data: {
        allEffects,
        id: user.airline?.id,
        currentTick: gameState.currentTick
    }}, { status: 200 })
}