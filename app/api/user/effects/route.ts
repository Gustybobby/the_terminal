import { NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "../../auth/[...nextauth]/_utils";

export const dynamic = "force-dynamic"

export async function GET(){
    const session = await getServerAuthSession()
    const now = new Date()
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
                                gte: now
                            }
                        }
                    }
                }
            }
        }
    })
    const effects = await prisma.effect.findMany({
        where: {
            type: "BCET",
            to: {
                gte: now
            }
        }
    })
    const allEffects = (user.airline?.recieveEffects ?? []).concat(effects)
    return NextResponse.json({ message: "SUCCESS", data: allEffects }, { status: 200 })
}