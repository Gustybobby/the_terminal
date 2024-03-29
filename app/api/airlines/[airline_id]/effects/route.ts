import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { GAME_ID } from "@/modules/routine";
import specialSkill from "@/modules/special-skill";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            currentTick: true
        }
    })
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            id: true,
            recieveEffects: {
                where: {
                    fromTick: { lte: gameState.currentTick },
                    toTick: { gte: gameState.currentTick }
                }
            },
            applyEffects: {
                where: {
                    fromTick: { lte: gameState.currentTick },
                    toTick: { gte: gameState.currentTick }
                }
            }
        }
    })
    const effects = await prisma.effect.findMany({
        where: {
            type: "BCET",
            toTick: { gte: gameState.currentTick }
        }
    })
    const allEffects = (airline.recieveEffects).concat(effects).concat(airline.applyEffects)
    return NextResponse.json({ message: "SUCCESS", data: {
        allEffects,
        id: airline.id,
        currentTick: gameState.currentTick
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
    if(session?.user.role === "USER" && user.airlineRole !== "Co_pilot"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    const request = await req.json()
    const { special, applyToId, terminalId, option } = request.data
    if(special){
        await specialSkill(+params.airline_id, applyToId, terminalId, option)
    }
    else if(session?.user.role === "ADMIN"){
        //handle custom buff
    }
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}