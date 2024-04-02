"use client"

import type { CasinoPlayData, CasinoSelectData } from "@/types/terminal"
import { useEffect, useState } from "react"

export default function useCasino({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<CasinoSelectData[] | "loading" | "error">("loading")
    const [shouldRefetch, refetch] = useState({})
    const [selectData, setSelectData] = useState<CasinoPlayData[] | "loading">("loading")
    useEffect(() => {
        fetch(`/api/casino`)
            .then(res => res.json())
            .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
    }, [shouldRefetch])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/casino`)
                .then(res => res.json())
                .then(data => data.message === "SUCCESS"? setData(data.data) : setData("error"))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    useEffect(() => {
        if(typeof data === "string"){
            return
        }
        setSelectData((selectData) => {
            if(selectData === "loading"){
                return data.map((airline) => ({ ...airline, pot: 100, playing: false }))
            }
            return data.map((airline) => {
                const matchSelect = selectData.find((al) => al.id === airline.id)
                return { ...airline, pot: matchSelect?.pot ?? 100, playing: !!matchSelect?.playing }
            })
        })
    }, [data])
    return { airlines: data, refetch, selectData, setSelectData }
}