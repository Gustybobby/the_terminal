"use client"

import { IoPeopleCircleSharp } from "react-icons/io5"
import useTerminal from "../hooks/useTerminal"
import { LoadingSpinner } from "../ui/loading-spinner"
import { useRouter } from "next/navigation"
import { TICKUNIT } from "@/modules/routine"
import type { SelectAirline } from "@/types/airline"
import AirlinesDropdown from "./airlines-dropdown"

export default function TerminalStaffDetails({ terminalId, airlines }: {
    terminalId: number
    airlines: SelectAirline[]
}){
    const { terminal } = useTerminal({ terminalId, refreshRate: TICKUNIT })
    const router = useRouter()
    if(terminal === "error"){
        router.replace("/status/terminals")
        return <></>
    }
    if(terminal === "loading"){
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner className="size-24"/>
            </div>
        )
    }
    return (
        <div className="px-4">
            <h1 className="text-5xl font-extrabold text-left mt-8 mb-4">
                Terminal {terminal.id}
            </h1>
            <div className="relative w-full flex flex-row items-center justify-between">
                <h2 className=" text-3xl font-bold mb-2">{terminal.title}</h2>
                <div className=" text-2xl font-semibold mb-2 flex flex-row items-center">
                    <div>{terminal.passengerRate}</div>&nbsp;
                    <IoPeopleCircleSharp/>
                    <div>/ {terminal.unitTick*TICKUNIT/1000} s</div>
                </div>
            </div>
            <p className="text-l font-normal mb-4 ml-1">{terminal.description}</p>
            <div className="w-full flex flex-col justify-center items-center">
                <h2 className=" text-2xl font-bold mb-2">Terminal Owner</h2>
                {terminal.capturedBy?
                <div className="border border-black px-6 py-1 rounded-lg shadow-lg mb-4">
                    <h4 className="text-center text-xl font-semibold">{terminal.capturedBy.title}</h4>
                </div>
                :
                <h1 className="text-base mb-4">No one have claimed this terminal yet</h1>
                }
                <h2 className=" text-xl font-bold mb-2">Select New Owner</h2>
                <AirlinesDropdown airlines={airlines} ownerId={terminal.capturedBy?.id ?? -1} terminalId={terminalId}/>
            </div>
        </div>
    )
}