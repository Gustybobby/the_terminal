"use client"

import type { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"
import { getExpTimestamp } from "./terminal-timer"

export default function TimerIncrementButton({ increment, duration, totalSeconds, setDuration, restart, isRunning }: {
    increment: number
    duration: number
    totalSeconds: number
    setDuration: Dispatch<SetStateAction<number>>
    restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
    isRunning: boolean
}){
    return (
        <Button
            onClick={()=>{
                if(isRunning){
                    restart(getExpTimestamp(totalSeconds*1000 + increment*1000), true)
                    return
                }
                setDuration(Math.max(0,duration + increment*1000))
                restart(getExpTimestamp(duration + increment*1000),false)
            }}
        >
            {increment > 0 && "+"}{increment}s
        </Button>
    )
}