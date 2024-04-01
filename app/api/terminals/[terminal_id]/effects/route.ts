import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils"
import { NextResponse, type NextRequest } from "next/server"
import prisma from "@/prisma-client"
import specialSkill from "@/modules/special-skill"

export async function POST(req: NextRequest, { params }: { params: { terminal_id: string }}){
    const session = await getServerAuthSession()
    if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    const request = await req.json()
        const { airlineSecret } = request.data
        const airline = await prisma.airline.findUniqueOrThrow({
            where: {
                airlineSecret
            },
            select: {
                id: true
            }
        })
    await specialSkill(airline.id, undefined, +params.terminal_id, 2)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}
