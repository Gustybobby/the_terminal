"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { sendJSONToAPI } from "@/tools/apiHandler"
import type { AirlineClass } from "@prisma/client"
import { FACTION_MAP } from "@/game/faction"

export default function EffectsEditFields({ airlineId, skillUse, airlineClass }: {
    airlineId: number
    skillUse: number
    airlineClass: AirlineClass
}){
    const [value, setValue] = useState<number | "">("")
    const [unit, setUnit] = useState<number | "">("")
    const [target, setTarget] = useState<number | "">("")

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full grid grid-cols-3 gap-2">
                <Input
                    value={value}
                    type="number"
                    placeholder="Number"
                    className="col-span-3"
                    onChange={(e) => setValue(e.target.value === ""? "" : +e.target.value)}
                />
                <Input
                    value={unit}
                    type="number"
                    placeholder="Unit Tick"
                    className="col-span-3"
                    onChange={(e) => setUnit(e.target.value === ""? "" : +e.target.value)}
                />
                <Input
                    value={target}
                    type="number"
                    placeholder="Target Airline/Terminal"
                    className="col-span-3"
                    onChange={(e) => setTarget(e.target.value === ""? "" : +e.target.value)}
                />
                <Button
                    onClick={async() => {
                        //something effect
                    }}
                    disabled={value === "" || unit === ""}
                    className="col-span-3"
                >
                    Add
                </Button>
                <Button
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: `/api/airlines/${airlineId}/effects`,
                            method: "POST",
                            body: JSON.stringify({ data: {
                                special: true,
                                applyToId: target === ""? null : target,
                                terminalId: target === ""? null : target,
                                option: 1,
                            }})
                        })
                    }}
                    disabled={FACTION_MAP[airlineClass].use-skillUse<=0}
                    className="col-span-3"
                >
                    Use Class Skill
                </Button>
            </div>
        </div>
    )
}