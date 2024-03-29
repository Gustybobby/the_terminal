"use client"

import type { Dispatch, SetStateAction } from "react"
import { useTimer } from "react-timer-hook"
import { Button } from "../ui/button"
import TimerIncrementButton from "./timer-increment-button"

export default function TerminalTimer({ duration, setDuration }: {
    duration: number
    setDuration: Dispatch<SetStateAction<number>>
}){
    const {
        totalSeconds, isRunning,
        hours, minutes, seconds,
        start, pause, restart
    } = useTimer({ expiryTimestamp: getExpTimestamp(duration), autoStart: false })
    
    return (
        <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg space-y-2">
            <h1 className={`text-2xl font-bold text-center ${isRunning? "text-green-600" : "text-red-500"}`}>
                Timer ({isRunning? "Running" : "Paused"})
            </h1>
            <div className="text-3xl text-center font-bold">
                {String(hours).padStart(2,"0")} : {String(minutes).padStart(2,"0")} : {String(seconds).padStart(2,"0")}
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
                {[-5,5,-10,10,-30,30].map((inc,index) => (
                    <TimerIncrementButton
                        key={"INC_"+index}
                        increment={inc}
                        duration={duration}
                        setDuration={setDuration}
                        restart={restart}
                        totalSeconds={totalSeconds}
                        isRunning={isRunning}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center space-x-1">
                <Button onClick={()=>start()} className="bg-green-500 hover:bg-green-400">
                    Start
                </Button>
                <Button onClick={()=>pause()} className="bg-red-500 hover:bg-red-400">
                    Pause
                </Button>
                <Button onClick={()=>restart(getExpTimestamp(duration),false)} className="bg-blue-500 hover:bg-blue-400">
                    Reset
                </Button>
            </div>
        </div>
    )
}

export const getExpTimestamp = (duration: number) => new Date((new Date).getTime() + duration)