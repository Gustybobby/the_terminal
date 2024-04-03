"use client"

import useTargetAirlines from "@/components/hooks/useTargetAirlines"
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { TICKUNIT } from "@/modules/routine"
import type { Dispatch, SetStateAction } from "react"
import type { TargetData } from "../skills-section"

export default function AirlineTargets({ airlineId, setTarget }: {
    airlineId: number
    setTarget: Dispatch<SetStateAction<TargetData | null>>
}){
    const { airlines } = useTargetAirlines({ refreshRate: TICKUNIT, airlineId })
    if(typeof airlines === "string"){
        return <></>
    }
    return (
        <DropdownMenuContent>
            {airlines.length > 0? airlines.map((airline) => (
                <DropdownMenuItem
                    key={airline.id}
                    onClick={() => setTarget({ target: "A", id: airline.id, title: airline.title, option: 1 })}
                >
                    {airline.title}
                </DropdownMenuItem>
                ))
                :
                <DropdownMenuItem className="text-red-600">
                    No Target Available
                </DropdownMenuItem>
            }
        </DropdownMenuContent>
    )
}