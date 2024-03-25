import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "../../../auth/[...nextauth]/_utils";
import { GAME_ID } from "@/modules/routine";

export async function POST(req: NextRequest){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    const request = await req.json()
    const pause = request.data
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        }
    })
    if(gameState.pause === pause){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    await prisma.gameState.update({
        where: {
            id: GAME_ID
        },
        data: {
            pause,
            lastPause: pause? new Date() : undefined,
            lastResume: pause? undefined : new Date(),
            lastTickUpdate: new Date()
        }
    })
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}