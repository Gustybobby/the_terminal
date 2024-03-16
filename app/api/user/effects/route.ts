import { NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils";

export const dynamic = "force-dynamic"

export async function GET(){
    const session = await getServerAuthSession()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id ?? ""
        },
        select: {
            airline: {
                select: {
                    recieveEffects: {
                        where: {
                            to: {
                                gte: new Date()
                            }
                        }
                    }
                }
            }
        }
    })
    return NextResponse.json({ message: "SUCCESS", data: user.airline?.recieveEffects ?? [] }, { status: 200 })
}