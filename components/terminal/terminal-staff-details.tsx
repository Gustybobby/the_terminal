"use client"

import { IoPeopleCircleSharp } from "react-icons/io5"
import { TerminalDrawer } from "./terminal-drawer"
import  TerminalTimer  from "./terminal-timer"

import useTerminal from "../hooks/useTerminal"
import { LoadingSpinner } from "../ui/loading-spinner"
import { useRouter } from "next/navigation"

export default function TerminalStaffDetails({ terminalId }: { terminalId: number }){
    const { terminal } = useTerminal({ terminalId, refreshRate: 5000 })
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
                    <div>/ {terminal.unitTime} s</div>
                </div>
            </div>
            <p className="text-l font-normal mb-4 ml-1">{terminal.description}</p>
            <div className="w-full flex flex-col justify-center items-center">
                <h2 className=" text-2xl font-bold mb-2">Terminal Owner</h2>
                {terminal.capturedBy?
                <>
                <div className="border border-black px-6 py-1 rounded-lg shadow-lg mb-2">
                    <h3 className="text-center text-2xl font-semibold mb-2">
                        Airline {terminal.capturedBy.id}
                    </h3>
                    <h4 className="text-center text-xl font-semibold">{terminal.capturedBy.title}</h4>
                </div>
                <h2 className="text-center text-2xl font-bold mb-2">Last Flight Departure</h2>
                <h3 className="text-center text-base font-semibold mb-4">
                    {(new Date(terminal.lastPassengerUpdate)).toLocaleString()}
                </h3>
                </>
                :
                <h1 className="text-base mb-4">No one have claimed this terminal yet</h1>
                }
                <TerminalDrawer flagSecret={terminal.currentFlagSecret}/>
                {/* <TerminalTimer/>
                <TerminalTimer/> */}
            </div>
        </div>
    )
}