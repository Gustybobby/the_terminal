"use client"
import { Card } from "../ui/card";
import { buttonVariants } from "../ui/button";
import type { AirlineData } from "@/types/airline";
import { FACTION_MAP } from "@/game/faction";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import type { AirlineClass, Effect } from "@prisma/client";
import { TICKUNIT } from "@/modules/routine";
import AirlineTargets from "./class-target-content/airline-targets";
import { type Dispatch, type SetStateAction, useState } from "react";
import ConfirmTargetDialog from "./class-target-content/confirm-target-dialog";
import { FaBuilding, FaBusinessTime, FaVirus } from "react-icons/fa";
import { FaExplosion, FaGear } from "react-icons/fa6";
import OptionTargets from "./class-target-content/option-targets";
import TerminalTargets from "./class-target-content/terminal-targets";
import { AirlineSecretDrawer } from "./airline-secret-drawer";

export interface TargetData {
    target: "T" | "A" | "NA",
    id: number
    title: string
    option: number
}

export default function SkillsSection({ airline, effects, currentTick }: {
    airline: AirlineData
    effects: Effect[]
    currentTick: number
}){
    const [target, setTarget] = useState<TargetData | null>(null)

    return (
        <div className="p-4">
            <h2 className="font-bold text-2xl mb-2">Active Abilities</h2>
            {effects.length === 0 && <span className="mb-2">No active abilities</span>}
            {effects.map((fx) => (
                <div
                    key={fx.id+"_EFFECT"}
                    className="font-semibold mb-2 text-base"
                >
                    using&nbsp;
                    <span className="text-blue-600">{FACTION_MAP[fx.type].ability_name}</span>&nbsp;
                    {fx.applyToId && <span className="inline-block">{`on Airline ${fx.applyToId}`}</span>}
                    {fx.terminalId && <span className="inline-block">{`on Terminal ${fx.terminalId}`}</span>}
                    ({(fx.toTick - currentTick)*TICKUNIT/1000}s left)
                </div>
            ))}
            <h2 className="font-bold text-2xl mb-2">Unused Abilities</h2>
            <div className="flex flex-col items-center">
                {(airline.stock > 0 && airline.class !== "None")?
                    <Card className="p-4 flex flex-col items-center space-y-1 w-fit">
                        {SkillIcon[airline.class]}
                        <h1 className="font-bold text-center">{FACTION_MAP[airline.class].ability_name}</h1>
                        <h2 className="font-semibold text-red-600">{airline.class !== "CET"? `Uses left for this phase: ${airline.stock}` : ""}</h2>
                        <div className="flex flex-col items-start">
                            {FACTION_MAP[airline.class].description.split("\n").map((line,j) => (
                            <div className={`mb-1 ${line.includes("***")? "text-red-600 font-semibold" : ""}`} key={j}>
                                {line}
                            </div>
                            ))}
                        </div>
                        <DropdownMenu>
                            <div className="flex items-center space-x-2">
                                {(airline.class === "BCET" || airline.class === "MT") && <AirlineSecretDrawer airlineSecret={airline.airlineSecret}/>}
                                <DropdownMenuTrigger
                                    className={buttonVariants({ variant: "outline", className: "bg-green-300 hover:bg-green-400" })}
                                    disabled={airline.class === "CET"}
                                    onClick={() => {
                                        if(airline.class === "MSME"){
                                            setTarget({ target: "NA", id: 0, title: "yourself", option: 1 })
                                        }
                                    }}
                                >
                                    {airline.class === "CET"? "Passive" : ((airline.class === "MT" || airline.class === "BCET")? "Option 2" : "Use")}
                                </DropdownMenuTrigger>
                            </div>
                            <TargetContent
                                airlineId={airline.id}
                                airlineClass={airline.class}
                                setTarget={setTarget}
                            />
                        </DropdownMenu>
                    </Card>
                    :
                    <span className="col-span-2">You used all your abilities for this phase</span>
                }
            </div>
            <ConfirmTargetDialog
                target={target}
                setTarget={setTarget}
                airlineClass={airline.class}
                airlineId={airline.id}
            />
        </div>
    )
}

function TargetContent({ airlineId, airlineClass, setTarget }: {
    airlineId: number
    airlineClass: AirlineClass
    setTarget: Dispatch<SetStateAction<TargetData | null>>
}){
    switch(airlineClass){
        case "ICT":
            return <AirlineTargets airlineId={airlineId} setTarget={setTarget}/>
        case "MSME":
            return <></>
        case "BCET":
        case "MT":
            return <TerminalTargets airlineId={airlineId} setTarget={setTarget}/>
    }
}

const SkillIcon = {
    "ICT": <FaVirus className="text-5xl"/>,
    "MSME": <FaGear className="text-5xl"/>,
    "BCET": <FaExplosion className="text-5xl"/>,
    "CET": <FaBuilding className="text-5xl"/>,
    "MT": <FaBusinessTime className="text-5xl"/>,
}