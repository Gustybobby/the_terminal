import { AbilityTargetData } from "@/types/airline"
import { useEffect, useState } from "react"

export default function useTargetTerminals({ refreshRate, airlineId }: {
    refreshRate: number
    airlineId: number
}){
    const [data, setData] = useState<AbilityTargetData[] | "loading" | "error">("loading")
    const [shouldRefetch, refetch] = useState({})
    useEffect(() => {
        fetch(`/api/airlines/${airlineId}/targets/terminals`)
            .then(res => res.json())
            .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
    }, [shouldRefetch, airlineId])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/airlines/${airlineId}/targets/terminals`)
                .then(res => res.json())
                .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate, airlineId])
    return { terminals: data, refetch }
}