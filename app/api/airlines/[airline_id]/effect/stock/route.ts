import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { classEffect } from "@/game/effect";

export async function GET(req: NextRequest, { params }: { params: { airline_id: string }}){
}