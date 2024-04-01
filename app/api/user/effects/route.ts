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
            id: true,
            airlineId: true,
        }
    })
    const allEffects = await prisma.effect.findMany({
        where: {
            fromTick: { lte: gameState.currentTick },
            toTick: { gte: gameState.currentTick },
            OR: [
                { type: "BCET" },
                { applyBy: { crews: { some: { id: user.id }}} },
                { applyTo: { crews: { some: { id: user.id }}} },
            ]
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: {
        allEffects,
        id: user.airlineId,
        currentTick: gameState.currentTick
    }}, { status: 200 })
}