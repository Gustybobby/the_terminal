import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma-client";
import { AbilityTargetData } from "@/types/airline";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            class: true,
            applyEffects: {
                select: {
                    terminalId: true,
                }
            }
        }
    })
    const allTerminals = await prisma.terminal.findMany({
        where: {
            airlineId: airline.class === "BCET"? undefined : +params.airline_id
        },
        select: {
            id: true,
            title: true,
        },
        orderBy: {
            id: "asc"
        }
    })
    const noEffectTerminals: AbilityTargetData[] = allTerminals
        .filter((tl) => !airline.applyEffects.find(({ terminalId }) => tl.id === terminalId && airline.class !== "MT"))
    return NextResponse.json({ message: "SUCCESS", data: noEffectTerminals })
}