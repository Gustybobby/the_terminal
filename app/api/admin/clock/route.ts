import { passengerUpdate } from "@/modules/routine";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    await passengerUpdate()
    return NextResponse.json("SUCCESS", { status: 200 })
}