import { type NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils";
import prisma from "@/prisma-client";
import { GAME_ID } from "@/modules/routine";

export async function PATCH(req: NextRequest){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    const request = await req.json()
    const { reset, ...data } = request.data
    const update = await prisma.gameState.update({
        where: {
            id: GAME_ID
        },
        data,
    })
    console.log(data)
    if(update.currentTick === 0){
        await prisma.terminal.updateMany({
            data: {
                lastUpdateTick: 0
            }
        })
        console.log("reset all terminals")
    }
    if(!update.start || reset){
        await prisma.effect.deleteMany()
        console.log("clear all effects")
        await prisma.airline.updateMany({
            data: {
                skillUse: 0
            },
        })
        console.log("reset all class skill uses")
        await prisma.captureRecord.updateMany({
            data: {
                capturedTick: 0
            }
        })
        console.log("reset all capturedTick")
    }
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}