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
    const data = request.data
    const update = await prisma.gameState.update({
        where: {
            id: GAME_ID
        },
        data,
    })
    console.log(update)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}