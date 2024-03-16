import type { AdminData } from "@/types/admin"
import { useEffect, useState } from "react"

export default function useAdmin({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<AdminData | "loading" | "error">("loading")
    const [shouldRefetch, refetch] = useState({})
    useEffect(() => {
        fetch(`/api/admin`)
            .then(res => res.json())
            .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
    }, [shouldRefetch])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/admin`)
                .then(res => res.json())
                .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    return { admin: data, refetch }
}