"use client"

import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { TICKUNIT } from "@/modules/routine"
import type { Dispatch, SetStateAction } from "react"
import type { TargetData } from "../skills-section"
import useTargetTerminals from "@/components/hooks/useTargetTerminals"

export default function TerminalTargets({ airlineId, setTarget }: {
    airlineId: number
    setTarget: Dispatch<SetStateAction<TargetData | null>>
}){
    const { terminals } = useTargetTerminals({ refreshRate: TICKUNIT, airlineId })
    if(typeof terminals === "string"){
        return <></>
    }
    return (
        <DropdownMenuContent>
            {terminals.length > 0? terminals.map((terminal) => (
                <DropdownMenuItem
                    key={terminal.id}
                    onClick={() => setTarget({ target: "T", id: terminal.id, title: terminal.title, option: 1 })}
                >
                    {terminal.title}
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