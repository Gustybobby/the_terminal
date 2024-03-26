import prisma from "@/prisma-client"
import { NextRequest, NextResponse } from "next/server"
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils"
import { GAME_ID } from "@/modules/routine"

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
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
}

export async function POST(req: NextRequest, { params }: { params: { terminal_id: string  }}){
    const session = await getServerAuthSession()
    if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    const request = await req.json()
    const airlineId = request.data
    const capture = await prisma.terminal.update({
        where: {
            id: +params.terminal_id
        },
        data: {
            airlineId,
        }
    })
    if(airlineId !== capture.airlineId){
        await prisma.effect.deleteMany({
            where: {
                terminalId: capture.id,
                AND: [
                    {
                        type: {
                            not: "BCET"
                        },
                    }, {
                        type: {
                            not: "MT"
                        },
                    }
                ],
            },
        })
    }
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            currentTick: true
        }
    })
    if(airlineId !== null){
        const now = new Date()
        const lastestRecord = await prisma.captureRecord.findFirst({
            where: {
                terminalId: capture.id
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
                    endTick: gameState.currentTick,
                }
            })
        }
        const record = await prisma.captureRecord.create({
            data: {
                airlineId,
                terminalId: capture.id,
                capturedAt: now,
                capturedTick: gameState?.currentTick,
            }
        })
        console.log(record)
    } else {
        console.log("Set terminal",params.terminal_id,"owner to None")
    }
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}