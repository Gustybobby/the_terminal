import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";

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
            }
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: airline }, { status: 200 })
}