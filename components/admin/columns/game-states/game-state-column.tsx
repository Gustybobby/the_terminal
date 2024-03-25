"use client"

import type { AdminData } from "@/types/admin"
import { Button } from "../../../ui/button"
import { sendJSONToAPI } from "@/tools/apiHandler"
import type { Dispatch, SetStateAction } from "react"
import GamePhaseDropdown from "./game-phase-dropdown"

export default function GameStateColumn({ admin, refetch }: {
    admin: AdminData
    refetch: Dispatch<SetStateAction<{}>>
}){
    return (
        <div className="h-full border border-black shadow-lg rounded-lg p-2 flex flex-col items-center space-y-2">
            <div className="w-full h-fit p-1 grid grid-cols-3 gap-1 items-center rounded-lg shadow-lg">
                <h1 className="col-span-3 font-bold text-2xl">Game State Control</h1>
                <h1 className="col-span-3 font-bold text-lg">
                    Current Tick: {admin.gameState.currentTick}/{admin.gameState.phase*10*30} (Phase {admin.gameState.phase})
                </h1>
                <Button
                    variant={"default"}
                    className="col-span-3 bg-green-500 hover:bg-green-400"
                    disabled={admin.gameState.start}
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: "/api/admin/game-state",
                            method: "PATCH",
                            body: JSON.stringify({ data: { start: true, currentTick: 0 } })
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
                        if(!admin.gameState.pause){
                            await sendJSONToAPI({
                                url: "/api/admin/game-state/pause",
                                method: "POST",
                                body: JSON.stringify({ data: true })
                            })
                        }
                        refetch({})
                    }}
                >
                    Stop Game
                </Button>
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
                <Button
                    variant={"default"}
                    className="bg-yellow-500 hover:bg-yellow-400"
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: "/api/admin/game-state",
                            method: "PATCH",
                            body: JSON.stringify({ data: { reset: true, currentTick: 0 } })
                        })
                        if(!admin.gameState.pause){
                            await sendJSONToAPI({
                                url: "/api/admin/game-state/pause",
                                method: "POST",
                                body: JSON.stringify({ data: true })
                            })
                        }
                        refetch({})
                    }}
                >
                    Reset
                </Button>
                {admin.gameState.lastPause &&
                <h2 className="col-span-3">
                    Last Pause: {(new Date(admin.gameState.lastPause)).toLocaleString()}
                </h2>
                }
                {admin.gameState.lastResume &&
                <h2 className="col-span-3">
                    Last Resume: {(new Date(admin.gameState.lastResume)).toLocaleString()}
                </h2>
                }
            </div>
            <div className="w-full h-fit p-2 flex flex-col justify-center items-center space-y-2 rounded-lg shadow-lg">
                <GamePhaseDropdown phase={admin.gameState.phase} refetch={refetch}/>
                <Button
                    variant={"default"}
                    className={admin.gameState.showLeaderboard? "bg-red-500 hover:bg-red-400" : "bg-green-500 hover:bg-green-400"}
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: "/api/admin/game-state",
                            method: "PATCH",
                            body: JSON.stringify({ data: { showLeaderboard: !admin.gameState.showLeaderboard } })
                        })
                        refetch({})
                    }}
                >
                    {admin.gameState.showLeaderboard? "Hide" : "Show"} Leaderboard
                </Button>
            </div>
        </div>
    )
}