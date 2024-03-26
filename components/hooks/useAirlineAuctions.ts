import { AirlineClassAuction } from "@/types/airline"
import { useEffect, useState } from "react"

export default function useAirlineAuctions({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<AirlineClassAuction[] | "loading" | "error">("loading")
    const [shouldRefetch, refetch] = useState({})
    useEffect(() => {
        fetch(`/api/airlines`)
            .then(res => res.json())
            .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
    }, [shouldRefetch])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/airlines`)
                .then(res => res.json())
                .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    return { airlines: data, refetch }
}