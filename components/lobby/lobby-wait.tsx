"use client"

import { Session } from "next-auth"
import LobbyWaitTable from "../airline/lobby-table"

export default function LobbyWait({ session }: { session: Session }){
    return (
        <div className="p-1">
            <h2 className="ml-4 font-bold text-2xl mb-2">Members</h2>
            <LobbyWaitTable session={session}/>
        </div>
    )
}