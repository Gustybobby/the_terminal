import prisma from "@/prisma-client"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(){
    try {
        const terminals = await prisma.terminal.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                passengerRate: true,
                unitTick: true,
                lastUpdateTick: true,
                capturedBy: {
                    select: {
                        id: true,
                        title: true,
                        color: true,
                    },
                },
            },
            orderBy: {
                id: "asc"
            }
        })
        return NextResponse.json({ message: "SUCCESS", data: terminals }, { status: 200 })
    } catch(e){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
}