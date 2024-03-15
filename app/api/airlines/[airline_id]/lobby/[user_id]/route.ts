import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";

export async function POST(req: NextRequest, { params }: { params: { airline_id: string, user_id: string }}){
    const session = await getServerAuthSession()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? ""
        },
        select: {
            airlineRole: true
        }
    })
    if(session?.user.role !== "ADMIN" && user.airlineRole !== "Co_pilot"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 400 })
    }
    const request = await req.json()
    const data = request.data
    if(data === "Co_pilot"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 400 })
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: params.user_id,
            NOT: {
                airlineRole: "Co_pilot"
            }
        },
        data: {
            airlineRole: data
        }
    })
    console.log("Updated User", updatedUser.name, "to airline role", updatedUser.airlineRole)
    if(updatedUser.airlineRole === "Captain"){
        const airline = await prisma.airline.findUniqueOrThrow({
            where: {
                id: +params.airline_id
            },
            select: {
                crews: {
                    select: {
                        airlineRole: true
                    }
                }
            }
        })
        if(airline.crews.filter((crew) => crew.airlineRole === "Captain").length !== 1){
            await prisma.airline.update({
                where: {
                    id: +params.airline_id
                },
                data: {
                    ready: false
                },
            })
            console.log("Unready airline",params.airline_id,"for invalid captain count")
        }
    }
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}