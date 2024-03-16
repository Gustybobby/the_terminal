"use client"

import { useEffect } from "react"

export default function Pinger(){
    useEffect(() => {
        const interval = setInterval(() => {
            fetch("/api/admin/game-state/clock")
        },5000)
        return () => clearInterval(interval)
    },[])
    return <></>
}