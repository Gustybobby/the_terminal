import { NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "../auth/[...nextauth]/_utils";
import { GAME_ID } from "@/modules/routine";

export const dynamic = "force-dynamic"

export async function GET(){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "ERROR " }, { status: 400 })
    }
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        }
    })
    const airlines = await prisma.airline.findMany({
        orderBy: {
            id: "asc"
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: { gameState, airlines } }, { status: 200 })
}