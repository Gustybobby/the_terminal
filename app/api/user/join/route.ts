import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils";
import prisma from "@/prisma-client";

export async function PATCH(req: NextRequest){
    const session = await getServerAuthSession()
    if(!session?.user.id){
        return NextResponse.json({ message: "UNAUTHENTICATED" }, { status: 400 })
    }
    try {
        const request = await req.json()
        const pin: string = request.data
        const airlineConnect = await prisma.airline.update({
            where: {
                airlineSecret: pin
            },
            data: {
                crews: {
                    connect: [{ id: session.user.id }]
                }
            }
        })
        console.log("Connected", session.user.email, "to airline", airlineConnect.id)
        return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
    } catch(e){
        return NextResponse.json({ message: "ERROR" }, { status: 500 })
    }
}