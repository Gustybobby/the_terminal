import prisma from "@/prisma-client"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(){
    const airlines = await prisma.airline.findMany({
        select: {
            id: true,
            title: true,
            class: true,
        },
        orderBy: {
            id: "asc"
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: airlines }, { status: 200 })
}