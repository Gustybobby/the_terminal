import prisma from "@/prisma-client"
import { NextRequest, NextResponse } from "next/server"
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils"
import { GAME_ID } from "@/modules/routine"
import { updateTerminalSecret } from "@/modules/terminal-secret"

export async function GET(req: NextRequest, { params }: { params: { terminal_id: string }}){
    const session = await getServerAuthSession()
    if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    try {
        const terminal = await prisma.terminal.findUniqueOrThrow({
            where: {
                id: +params.terminal_id
            },
            select: {
                id: true,
                title: true,
                secret: true,
                status: true,
                description: true,
                passengerRate: true,
                unitTick: true,
                lastUpdateTick: true,
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
        return NextResponse.json({ message: "ERROR" }, { status: 500 })
    }
}

export async function POST(req: NextRequest, { params }: { params: { terminal_id: string }}){
    const session = await getServerAuthSession()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? ""
        },
        select: {
            airlineRole: true
        }
    })
    if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN" && user.airlineRole !== "Co_pilot"){
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
    const request = await req.json()
    if(request.data !== null && typeof request.data === "object"){
        const { airlineId, secret } = request.data
        const terminal = await prisma.terminal.update({
            where: {
                secret
            },
            data: {
                airlineId,
                lastUpdateTick: gameState.currentTick
            }
        })
        await captureCleanUp(terminal.airlineId, terminal.id, gameState.currentTick)
        await updateTerminalSecret(terminal.id)
    } else {
        const airlineId = request.data
        const terminal = await prisma.terminal.update({
            where: {
                id: +params.terminal_id
            },
            data: {
                airlineId,
                lastUpdateTick: gameState.currentTick
            }
        })
        await captureCleanUp(terminal.airlineId, terminal.id, gameState.currentTick)
        await updateTerminalSecret(terminal.id)
    }
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}

async function captureCleanUp(airlineId: number | null, terminalId: number, currentTick: number){
    await prisma.effect.deleteMany({
        where: {
            terminalId,
            type: { not: "BCET" },
            OR: [
                { type: { not: "MT" } },
                { multiplier: 0.9 },
            ],
        },
    })
    // update endAt and endTick of lastest capture record
    const now = new Date()
    const lastestRecord = await prisma.captureRecord.findFirst({
        where: {
            terminalId
        },
        select: {
            id: true
        },
        orderBy: {
            capturedAt: "desc"
        }
    })
    if(lastestRecord){
        await prisma.captureRecord.update({
            where: {
                id: lastestRecord.id
            },
            data: {
                endAt: now,
                endTick: currentTick,
            }
        })
    }
    //case where owner is not set to none
    if(airlineId !== null){
        const record = await prisma.captureRecord.create({
            data: {
                airlineId,
                terminalId,
                capturedAt: now,
                capturedTick: currentTick,
            }
        })
        console.log(record)
    } else {
        console.log("Set terminal",terminalId,"owner to None")
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { terminal_id: string }}){
    const session = await getServerAuthSession()
    if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    const request = await req.json()
    const { status } = request.data
    const updatedTerminal = await prisma.terminal.update({
        where: {
            id: +params.terminal_id
        },
        data: {
            status
        }
    })
    console.log(updatedTerminal)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}