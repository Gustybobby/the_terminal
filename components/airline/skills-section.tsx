"use client"
import { GiPotionBall } from "react-icons/gi";
import { Card } from "../ui/card";
import { buttonVariants } from "../ui/button";
import type { AirlineData } from "@/types/airline";
import { FACTION_MAP } from "@/game/faction";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import type { Effect } from "@prisma/client";
import { TICKUNIT } from "@/modules/routine";

export default function SkillsSection({ airline, effects, currentTick }: {
    airline: AirlineData
    effects: Effect[]
    currentTick: number
}){
    return (
        <div className="p-4">
            <h2 className="font-bold text-2xl mb-2">Active Abilities</h2>
            {effects.length === 0 && <span className="mb-2">No active abilities</span>}
            {effects.map((fx) => (
                <div
                    key={fx.id+"_EFFECT"}
                    className="font-semibold mb-2 text-base"
                >
                    using
                    &nbsp;
                    <span className="text-blue-600">{FACTION_MAP[fx.type].ability_name}</span>
                    &nbsp;
                    {fx.applyToId && <span className="inline-block">{`on Airline ${fx.applyToId}`}</span>}
                    {fx.terminalId && <span className="inline-block">{`on Terminal ${fx.terminalId}`}</span>}
                    &nbsp;
                    ({(fx.toTick - currentTick)*TICKUNIT/1000}s left)
                </div>
            ))}
            <h2 className="font-bold text-2xl mb-2">Unused Abilities</h2>
            <div className="grid grid-cols-2 gap-1">
                {(airline.stock && airline.class !== "None")?
                    Array(Math.max(airline.stock,0)).fill(0).map((_, index) => (
                        <Card className="py-2 flex flex-col items-center space-y-1" key={index}>
                            <GiPotionBall className="text-5xl"/>
                            <h1 className="font-bold text-center">{FACTION_MAP[airline.class].ability_name}</h1>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className={buttonVariants({ variant: "outline", className: "bg-green-300 hover:bg-green-400" })}
                                    disabled={true}
                                >
                                    {airline.class === "CET"? "Passive" : "Use"}
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </Card>
                    ))
                    :
                    <span className="col-span-2">You used all your abilities for this phase</span>
                }
            </div>
        </div>
    )
}