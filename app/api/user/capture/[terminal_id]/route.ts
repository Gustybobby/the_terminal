import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { randomSixDigits } from "@/modules/randomdigits";

export async function POST(req: NextRequest, { params }: { params: { terminal_id: string  }}){
    const session = await getServerAuthSession()
    if(!session?.user.id){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    const { airline, lastSecretAttempt } = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        },
        select: {
            lastSecretAttempt: true,
            airline: {
                select: {
                    id: true,
                    title: true,
                }
            }
        }
    })
    if(!airline){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    if(!!lastSecretAttempt && (new Date()).getTime() - lastSecretAttempt.getTime() < 15000){
        const elapsed = (new Date()).getTime() - lastSecretAttempt.getTime()
        return NextResponse.json({ message: "COOLDOWN", elapsed: 15 - Math.ceil(elapsed/1000) }, { status: 400 })
    }
    const request = await req.json()
    const pin = request.data
    const terminal = await prisma.terminal.findUniqueOrThrow({
        where: {
            id: +params.terminal_id 
        },
        select: {
            currentFlagSecret: true
        }
    })
    if(terminal.currentFlagSecret !== pin){
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                lastSecretAttempt: new Date()
            }
        })
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    const prevCapture = await prisma.terminal.findUniqueOrThrow({
        where: {
            id: +params.terminal_id
        },
        select: {
            capturedBy: {
                select: {
                    id: true,
                    class: true,
                }
            }
        }
    })
    const captures = await prisma.terminal.update({
        where: {
            id: +params.terminal_id
        },
        data: {
            airlineId: airline.id,
            currentFlagSecret: randomSixDigits(),
            lastPassengerUpdate: new Date(),
        }
    })
    if(prevCapture.capturedBy){
        switch(prevCapture.capturedBy.class){
            case "CET":
            case "MSME":
                await prisma.effect.deleteMany({
                    where: {
                        applyById: prevCapture.capturedBy.id,
                        type: prevCapture.capturedBy.class,
                    }
                })
                console.log("Deleted",prevCapture.capturedBy,"effect")
        }
    }
    const record = await prisma.captureRecord.create({
        data: {
            airlineId: airline.id,
            terminalId: captures.id,
            capturedAt: new Date()
        }
    })
    console.log(record)
    console.log("new secret is",captures.currentFlagSecret)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}