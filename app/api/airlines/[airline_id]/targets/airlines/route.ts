import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma-client";
import { AirlineTargetData } from "@/types/airline";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            class: true,
            applyEffects: {
                select: {
                    applyToId: true,
                }
            }
        }
    })
    const allAirlines = await prisma.airline.findMany({
        select: {
            id: true,
            title: true,
        }
    })
    const noEffectAirlines: AirlineTargetData[] = allAirlines
        .filter((al) => !airline.applyEffects.find(({ applyToId }) => al.id === applyToId) && al.id !== +params.airline_id)
    return NextResponse.json({ message: "SUCCESS", data: noEffectAirlines })
}