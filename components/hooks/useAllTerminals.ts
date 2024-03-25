import type { TerminalData } from "@/types/terminal"
import { useEffect, useState } from "react"

export default function useAllTerminals({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<TerminalData[] | "loading" | "error">("loading")
    useEffect(() => {
        fetch(`/api/terminals`)
            .then(res => res.json())
            .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        const interval = setInterval(() => {
            fetch(`/api/terminals`)
                .then(res => res.json())
                .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    return { terminals: data }
}