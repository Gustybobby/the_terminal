"use client"

import Display from "./display"
import LobbyTable from "./lobby-table"
import SkillsSection from "./skills-section"
import useAirline from "../hooks/useAirline"

export default function Interactable({ airlineId }: { airlineId: string }){
    const { airline } = useAirline({ airlineId, refreshRate: 5000 })
    return (
        <div className="p-1">
            <Display airline={airline}/>
            <SkillsSection/>
            <h2 className="ml-4 font-bold text-2xl mb-2">Members</h2>
            <LobbyTable tableData={airline !== "loading"? airline.crews : []}/>
        </div>
    )
}