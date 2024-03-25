"use client"

import { TICKUNIT } from "@/modules/routine"
import useAdmin from "../hooks/useAdmin"
import useCaptureToast from "../hooks/useCaptureToast"
import { LoadingSpinner } from "../ui/loading-spinner"
import AirlinesColumn from "./columns/airlines/airlines-column"
import GameStateColumn from "./columns/game-states/game-state-column"
import TerminalsColumn from "./columns/terminals/terminals-column"

export default function Dashboard(){
    const { admin, refetch } = useAdmin({ refreshRate: TICKUNIT })
    useCaptureToast()

    if(admin === "loading" || admin === "error"){
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingSpinner className="size-40"/>
            </div>
        )
    }
    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-4 p-4 gap-2">
            <GameStateColumn admin={admin} refetch={refetch}/>
            <AirlinesColumn admin={admin} refetch={refetch}/>
            <TerminalsColumn admin={admin} refetch={refetch}/>
        </div>
    )
}