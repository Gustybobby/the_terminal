import type { AirlineData } from "@/types/airline"
import { useEffect, useState } from "react"

export default function useAirline({ airlineId, refreshRate }: {
    airlineId: string
    refreshRate: number
}){
    const [data, setData] = useState<AirlineData | "loading">("loading")
    useEffect(() => {
        fetch(`/api/airlines/${airlineId}`)
            .then(res => res.json())
            .then(data => setData(data.data))
        const interval = setInterval(() => {
            fetch(`/api/airlines/${airlineId}`)
                .then(res => res.json())
                .then(data => setData(data.data))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate, airlineId])
    return { airline: data }
}