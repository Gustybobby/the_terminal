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
                unitTime: true,
                lastPassengerUpdate: true,
                capturedBy: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                capturedByRecords: {
                    where: {
                        capturedAt: {
                            gt: new Date((new Date()).getTime()-5000)
                        }
                    },
                    select: {
                        airline: {
                            select: {
                                id: true,
                                title: true
                            }
                        },
                        capturedAt: true,
                    }
                }
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