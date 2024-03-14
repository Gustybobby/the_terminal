import { LeaderboardData } from "@/types/airline"
import { useEffect, useState } from "react"

export default function useLeaderboard({ refreshRate }: {
    refreshRate: number
}){
    const [data, setData] = useState<LeaderboardData[] | "loading">("loading")
    useEffect(() => {
        fetch("/api/leaderboard")
            .then(res => res.json())
            .then(data => setData(data.data))
        const interval = setInterval(() => {
            fetch("/api/leaderboard")
                .then(res => res.json())
                .then(data => setData(data.data))
        }, refreshRate)
        return () => clearInterval(interval)
    },[refreshRate])
    return { leaderboard: data }
}