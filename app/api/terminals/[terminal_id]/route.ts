import prisma from "@/prisma-client"
import { NextRequest, NextResponse } from "next/server"
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils"

export async function GET(req: NextRequest, { params }: { params: { terminal_id: string }}){
    const session = await getServerAuthSession()
    if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 400 })
    }
    try {
        const terminal = await prisma.terminal.findUniqueOrThrow({
            where: {
                id: +params.terminal_id
            },
            select: {
                id: true,
                title: true,
                description: true,
                passengerRate: true,
                unitTime: true,
                lastPassengerUpdate: true,
                currentFlagSecret: true,
                capturedBy: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        })
        return NextResponse.json({ message: "SUCCESS", data: terminal }, { status: 200 })
    } catch(e){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
}