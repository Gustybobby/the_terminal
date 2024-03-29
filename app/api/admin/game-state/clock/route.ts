import { NextResponse } from "next/server";
import { getServerAuthSession } from "../../../auth/[...nextauth]/_utils";
import { gameCycle } from "@/modules/routine";

export const dynamic = "force-dynamic"

export async function GET(){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 })
    }
    await gameCycle()
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}