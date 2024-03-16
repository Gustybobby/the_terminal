"use client"

import useAdmin from "../hooks/useAdmin"
import { LoadingSpinner } from "../ui/loading-spinner"
import AirlinesColumn from "./airlines-column"
import GameStateColumn from "./game-state-column"

export default function Dashboard(){
    const { admin, refetch } = useAdmin({ refreshRate: 5000 })
    if(admin === "loading" || admin === "error"){
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingSpinner className="size-40"/>
            </div>
        )
    }
    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-3 p-4 gap-2">
            <GameStateColumn admin={admin} refetch={refetch}/>
            <AirlinesColumn admin={admin} refetch={refetch}/>
            <div className="h-full border border-black shadow-lg rounded-lg">

            </div>
        </div>
    )
}