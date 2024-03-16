"use client"

import type { AdminData } from "@/types/admin"
import type { Dispatch, SetStateAction } from "react"

export default function TerminalsColumn({ admin, refetch }: {
    admin: AdminData
    refetch: Dispatch<SetStateAction<{}>>
}){
    return (
        <div className="h-full border border-black shadow-lg rounded-lg p-2 flex flex-col items-center overflow-y-auto">
            <div className="w-full h-fit p-1 grid grid-cols-1 gap-1 items-center rounded-lg shadow-lg">

            </div>
        </div>
    )
}