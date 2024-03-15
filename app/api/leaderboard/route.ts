import { passengerUpdate } from "@/modules/routine"
import prisma from "@/prisma-client"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(){
    await passengerUpdate()
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