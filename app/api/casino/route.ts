import prisma from "@/prisma-client";
import { type NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "../auth/[...nextauth]/_utils";

export const dynamic = "force-dynamic"

export async function GET(){
    const session = await getServerAuthSession()
    if (session?.user.role !== "ADMIN" && session?.user.role !== "STAFF")  {
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    const airlines = await prisma.airline.findMany({
        select: {
            id: true,
            title: true,
            passengers: true,
        },
        orderBy: {
            id: "asc"
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: airlines }, { status: 200 })
}

interface updateType {
    airline_id: number;
    passengerAmount: number;
}

export async function POST(req: NextRequest) {
    const request = await req.json()
    const data = request.data as updateType
    const session = await getServerAuthSession()
    if (session?.user.role !== "ADMIN" && session?.user.role !== "STAFF")  {
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    const updatedAirline = await prisma.airline.update({
        where: {
            id: data.airline_id,
        },
        data: {
            passengers: { increment: data.passengerAmount },
        },
        select: {
            id: true,
            title: true,
            passengers: true,
        },
    })
    console.log("Updated",updatedAirline,"incremented by",data.passengerAmount)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
}
