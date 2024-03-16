import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma-client";
import { GAME_ID } from "@/modules/routine";
import { FACTION_MAP } from "@/game/faction";
import type { Faction } from "@/types/terminal";

export async function POST(req: NextRequest, { params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    if(!session?.user.id){
        return NextResponse.json({ message: "UNAUTHENTICATED" }, { status: 400 })
    }
    const request = await req.json()
    const data = request.data
    const { airline } = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id,
            airlineRole: "Captain",
            airlineId: +params.airline_id,
        },
        select: {
            airline: {
                select: {
                    class: true,
                    applyEffects: {
                        select: {
                            type: true,
                        }
                    }
                }
            }
        }
    })
    const faction = FACTION_MAP[airline?.class ?? "None"]
    const effectCount = airline?.applyEffects.filter((effect) => effect.type === airline.class).length ?? 0
    if(effectCount >= faction.use){
        return NextResponse.json({ message: "ERROR" }, { status: 400 })
    }
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID,
            pause: false,
            start: true,
        },
        select: {
            phase: true,
        }
    })
    const newEffect = await prisma.effect.create({
        data: {
            type: airline?.class ?? "None",
            applyById: +params.airline_id,
            from: new Date(),
            to: new Date((new Date()).getTime()+interpretDuration(faction, gameState.phase)),
            applyToId: interpretApplyTo(faction, data.applyToId),
        }
    })
    console.log(newEffect)
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
}

function interpretDuration(faction: Faction, phase: number){
    if(faction.duration === -1){
        return faction.duration_factor*phase*10*60*1000
    }
    return faction.duration*faction.duration_factor
}

function interpretApplyTo(faction: Faction, applyToId: number){
    switch(faction.abbreviation){
        case "ICT":
            return applyToId
        default:
            throw "unimplemented"
    }
}