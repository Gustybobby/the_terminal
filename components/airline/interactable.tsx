"use client"

import Display from "./display"
import SkillsSection from "./skills-section"
import useAirline from "../hooks/useAirline"
import { LoadingSpinner } from "../ui/loading-spinner"
import type { Session } from "next-auth"
import useCaptureToast from "../hooks/useCaptureToast"
import type { Effect } from "@prisma/client"
import { TICKUNIT } from "@/modules/routine"

export default function Interactable({ airlineId, session, isCaptain, ...props }: {
    airlineId: string
    session: Session
    isCaptain: boolean,
}){
    const { airline } = useAirline({ airlineId, refreshRate: TICKUNIT })
    useCaptureToast()
    const effects = (props as any).effects as Effect[]
    const currentTick = (props as any).currentTick as number
    if(airline === "loading"){
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner className="size-24"/>
            </div>
        )
    }
    return (
        <div className="p-1">
            <Display airline={airline} effects={effects}/>
            <SkillsSection
                airlineId={+airlineId}
                airline={airline}
                isCaptain={isCaptain}
                effects={effects}
                currentTick={currentTick}
            />
        </div>
    )
}