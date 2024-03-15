import { passengerUpdate } from "@/modules/routine";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest){
    await passengerUpdate()
    return NextResponse.json("SUCCESS", { status: 200 })
}