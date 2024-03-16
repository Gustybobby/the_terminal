import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { classEffect } from "@/game/effect";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            passengers: true,
            crews: {
                select: {
                    airlineRole: true,
                    name: true,
                }
            },
            captures: {
                select: {
                    id: true,
                    title: true,
                    passengerRate: true,
                    unitTime: true,
                },
                orderBy: {
                    id: "asc"
                }
            },
            class: true,
            applyEffects: {
                select: {
                    type: true
                }
            }
        }
    })
    const classEffectCount = airline.applyEffects.filter((effect) => effect.type === airline.class).length
    return NextResponse.json({ message: "SUCCESS", data: {
        ...airline,
        stock: (classEffect[airline.class as keyof typeof classEffect].limit ?? 0) - classEffectCount
    } }, { status: 200 })
}