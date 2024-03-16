import { passengerUpdate } from "@/modules/routine";
import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "../../../auth/[...nextauth]/_utils";

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "ERROR " }, { status: 400 })
    }
    await passengerUpdate()
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}