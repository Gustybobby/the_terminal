"use client"
import { GiPotionBall } from "react-icons/gi";
import { Card } from "../ui/card";
import { buttonVariants } from "../ui/button";
import type { AirlineData } from "@/types/airline";
import { FACTION_MAP } from "@/game/faction";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import ICTContent from "./target-selection/ict-content";
import MSMEContent from "./target-selection/msme-content";
import BCETContent from "./target-selection/bcet-content";

export default function SkillsSection({ airlineId, airline, isCaptain }: {
    airlineId: number
    airline: AirlineData
    isCaptain: boolean
}){
    return (
        <div className="p-4">
            <h2 className="font-bold text-2xl mb-2">Abilities</h2>
            <div className="grid grid-cols-2">
                {airline.stock?
                    Array(airline.stock).fill(0).map((_, index) => (
                        <Card className="py-2 flex flex-col items-center space-y-1" key={index}>
                            <GiPotionBall className="text-5xl"/>
                            <h1 className="font-bold">{FACTION_MAP[airline.class].ability_name}</h1>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className={buttonVariants({ variant: "outline", className: "bg-green-300 hover:bg-green-400" })}
                                    disabled={!isCaptain || airline.class === "CET" || (airline.class === "MSME" && airline.captures.length === 0)}
                                >
                                    {airline.class === "CET"? "Passive" : "Use"}
                                </DropdownMenuTrigger>
                                {airline.class === "ICT" &&
                                <ICTContent airlineId={airlineId} allAirlines={airline.allAirlines}/>
                                }
                                {airline.class === "MSME" &&
                                <MSMEContent airlineId={airlineId} captures={airline.captures}/>
                                }
                                {airline.class === "BCET" &&
                                <BCETContent airlineId={airlineId}/>
                                }
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