import type { AirlineLobby } from "@/types/airline"
import { useEffect, useState } from "react"

export default function useLobby({ airlineId, refreshRate }: {
    airlineId: number
    refreshRate: number
}){
    const [data, setData] = useState<AirlineLobby | "loading">("loading")
    const [shouldRefetch, refetch] = useState({})
    useEffect(() => {
        fetch(`/api/airlines/${airlineId}/lobby`)
            .then(res => res.json())
            .then(data => setData(data.data))
    }, [shouldRefetch, airlineId])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/airlines/${airlineId}/lobby`)
                .then(res => res.json())
                .then(data => setData(data.data))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate, airlineId])
    return { airlineLobby: data, refetch }
}