import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { GAME_ID } from "@/modules/routine";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            ready: true,
            crews: {
                select: {
                    id: true,
                    name: true,
                    airlineRole: true,
                },
                orderBy: {
                    airlineRole: "asc"
                }
            }
        }
    })
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            start: true
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: {
        start: gameState.start,
        ...airline,
    }}, { status: 200 })
}

export async function POST(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? ""
        },
        select: {
            airlineRole: true
        }
    })
    if(session?.user.role !== "ADMIN" && user.airlineRole !== "Co_pilot"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 400 })
    }
    const request = await req.json()
    const { ready } = request.data
    await prisma.airline.update({
        where: {
            id: +params.airline_id
        },
        data: {
            ready
        },
    })
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}

