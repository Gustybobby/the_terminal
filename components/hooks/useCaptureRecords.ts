import type { CapturedByRecord } from "@/types/terminal"
import { useEffect, useState } from "react"

export default function useCaptureRecords({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<CapturedByRecord[] | "loading" | "error">("loading")
    useEffect(() => {
        fetch(`/api/capture-records`)
            .then(res => res.json())
            .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        const interval = setInterval(() => {
            fetch(`/api/capture-records`)
                .then(res => res.json())
                .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    return { captureRecords: data }
}