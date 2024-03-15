"use client"

import { useEffect } from "react"

export default function Pinger(){

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("admin/clock")
        },5000)
        return () => clearInterval(interval)
    },[])
    return <div>Pinging</div>
}