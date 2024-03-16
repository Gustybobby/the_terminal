"use client"

import type { AdminData } from "@/types/admin"
import { Button } from "../ui/button"
import { sendJSONToAPI } from "@/tools/apiHandler"
import type { Dispatch, SetStateAction } from "react"

export default function GameStateColumn({ admin, refetch }: {
    admin: AdminData
    refetch: Dispatch<SetStateAction<{}>>
}){
    return (
        <div className="h-full border border-black shadow-lg rounded-lg p-2 flex flex-col items-center">
            <div className="w-full h-fit p-1 grid grid-cols-3 gap-1 items-center rounded-lg shadow-lg">
                <h1 className="col-span-3 font-bold text-2xl">Game State Control</h1>
                <Button
                    variant={"default"}
                    className="col-span-3 bg-green-500 hover:bg-green-400"
                    disabled={admin.gameState.start}
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: "/api/admin/game-state",
                            method: "PATCH",
                            body: JSON.stringify({ data: { start: true } })
                        })
                        refetch({})
                    }}
                >
                    Start Game
                </Button>
                <Button
                    variant={"destructive"}
                    className="col-span-3"
                    disabled={!admin.gameState.start}
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: "/api/admin/game-state",
                            method: "PATCH",
                            body: JSON.stringify({ data: { start: false } })
                        })
                        refetch({})
                    }}
                >
                    Stop Game
                </Button>
                <h1 className="font-bold text-xl">Time Control</h1>
                <Button
                    variant={"default"}
                    disabled={admin.gameState.pause}
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: "/api/admin/game-state/pause",
                            method: "POST",
                            body: JSON.stringify({ data: true })
                        })
                        refetch({})
                    }}
                >
                    Pause
                </Button>
                <Button
                    variant={"default"}
                    disabled={!admin.gameState.pause}
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: "/api/admin/game-state/pause",
                            method: "POST",
                            body: JSON.stringify({ data: false })
                        })
                        refetch({})
                    }}
                >
                    Resume
                </Button>
                {admin.gameState.lastPause &&
                <h2 className="col-span-3">
                    Last Pause: {(new Date(admin.gameState.lastPause)).toLocaleString()}
                </h2>
                }
                {admin.gameState.lastResume &&
                <h2 className="col-span-3">
                    Last Pause: {(new Date(admin.gameState.lastResume)).toLocaleString()}
                </h2>
                }
            </div>
        </div>
    )
}