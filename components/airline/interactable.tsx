"use client"

import { Session } from "next-auth"
import Display from "./display"
import LobbyTable from "./lobby-table"
import SkillsSection from "./skills-section"

export default function Interactable({ session }: { session: Session }){
    return (
        <div className="p-1">
            <Display/>
            <SkillsSection/>
            <h2 className="ml-4 font-bold text-2xl mb-2">Members</h2>
            <LobbyTable session={session}/>
        </div>
    )
}