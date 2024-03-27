import type { Effect } from "@prisma/client"
import { useEffect, useState } from "react"

export default function useRecieveEffects({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<{ allEffects: Effect[], id: number, currentTick: number }| "loading">("loading")
    const [shouldRefetch, refetch] = useState({})
    useEffect(() => {
        fetch(`/api/user/effects`)
            .then(res => res.json())
            .then(data => setData(data.data))
    }, [shouldRefetch])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/user/effects`)
                .then(res => res.json())
                .then(data => setData(data.data))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    if (data === "loading"){
        return { effects: "loading" as "loading", id: "loading" as "loading", refetch }
    }
    return { effects: data.allEffects, id: data.id, currentTick: data.currentTick, refetch }
}