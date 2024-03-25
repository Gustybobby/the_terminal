import { GAME_ID } from "@/modules/routine"
import prisma from "@/prisma-client"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(){
    const { showLeaderboard } = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            showLeaderboard: true
        }
    })
    if(!showLeaderboard){
        const hidden = Array(10).fill(0).map(() => ({
            title: "???",
            passengers: 88888
        }))
        return NextResponse.json({ message: "SUCCESS", data: hidden }, { status: 200 })
    }
    const airlines = await prisma.airline.findMany({
        select: {
            title: true,
            passengers: true,
        },
        orderBy: {
            passengers: "desc"
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: airlines }, { status: 200 })
}