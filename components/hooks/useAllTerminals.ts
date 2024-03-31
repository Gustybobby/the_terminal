import type { TerminalData } from "@/types/terminal"
import { useEffect, useState } from "react"

export default function useAllTerminals({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<TerminalData[] | "loading" | "error">("loading")
    const [currentTick, setCurrentTick] = useState<number>(0)
    useEffect(() => {
        fetch(`/api/terminals`)
            .then(res => res.json())
            .then(data => {
                if(data.message === "SUCCESS"){
                    setData(data.data.terminals)
                    setCurrentTick(data.data.currentTick)
                } else {
                    setData("error")
                }
            })
        const interval = setInterval(() => {
            fetch(`/api/terminals`)
                .then(res => res.json())
                .then(data => {
                    if(data.message === "SUCCESS"){
                        setData(data.data.terminals)
                        setCurrentTick(data.data.currentTick)
                    } else {
                        setData("error")
                    }
                })
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    return { terminals: data, currentTick }
}