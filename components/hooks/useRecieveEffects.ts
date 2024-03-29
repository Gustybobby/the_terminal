import type { Effect } from "@prisma/client"
import { useEffect, useState } from "react"

export default function useRecieveEffects({ refreshRate, airlineId }: {
    refreshRate: number
    airlineId?: number
}){
    const [data, setData] = useState<{ allEffects: Effect[], id: number, currentTick: number }| "loading">("loading")
    const [shouldRefetch, refetch] = useState({})
    useEffect(() => {
        fetch(airlineId === undefined? `/api/user/effects` : `/api/airlines/${airlineId}/effects`)
            .then(res => res.json())
            .then(data => setData(data.data))
    }, [shouldRefetch, airlineId])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(airlineId === undefined? `/api/user/effects` : `/api/airlines/${airlineId}/effects`)
                .then(res => res.json())
                .then(data => setData(data.data))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate, airlineId])
    if (data === "loading"){
        return { effects: "loading" as "loading", id: "loading" as "loading", refetch }
    }
    return { effects: data.allEffects, id: data.id, currentTick: data.currentTick, refetch }
}