import prisma from "@/prisma-client"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(){
    try {
        const terminals = await prisma.terminal.findMany({
            select: {
                title: true,
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
            }
        })
        const records = terminals.map((terminal) => terminal.capturedByRecords.map((record) => ({
            title: terminal.title,
            ...record,
        }))).flat()
        return NextResponse.json({
            message: "SUCCESS",
            data: records,
        }, { status: 200 })
    } catch(e){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
}