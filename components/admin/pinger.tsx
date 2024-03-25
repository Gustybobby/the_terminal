"use client"

import { TICKUNIT } from "@/modules/routine"
import { useEffect } from "react"

export default function Pinger(){
    useEffect(() => {
        const interval = setInterval(() => {
            fetch("/api/admin/game-state/clock")
        }, TICKUNIT)
        return () => clearInterval(interval)
    },[])
    return <></>
}