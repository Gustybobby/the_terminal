"use client"

import Display from "./display"
import LobbyTable from "./lobby-table"
import SkillsSection from "./skills-section"
import useAirline from "../hooks/useAirline"
import { LoadingSpinner } from "../ui/loading-spinner"
import type { Session } from "next-auth"
import useCaptureToast from "../hooks/useCaptureToast"

export default function Interactable({ airlineId, session, isCaptain }: {
    airlineId: string
    session: Session
    isCaptain: boolean
}){
    const { airline } = useAirline({ airlineId, refreshRate: 5000 })
    useCaptureToast()
    
    if(airline === "loading"){
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner className="size-24"/>
            </div>
        )
    }
    return (
        <div className="p-1">
            <Display airline={airline}/>
            <SkillsSection airline={airline} isCaptain={isCaptain}/>
            <h2 className="ml-4 font-bold text-2xl mb-2">Members</h2>
            <LobbyTable tableData={airline.crews} session={session}/>
        </div>
    )
}