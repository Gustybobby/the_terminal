"use client"

import type { Dispatch, SetStateAction } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu"
import { sendJSONToAPI } from "@/tools/apiHandler";

export default function GamePhaseDropdown({ phase, refetch }: {
    phase: number;
    refetch: Dispatch<SetStateAction<{}>>;
}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-slate-300 rounded-lg px-2 hover:bg-gray-200 transition-colors py-1">
                Phase {phase}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {[1,2,3].map((num) => (
                    <DropdownMenuItem 
                        key={num}
                        onClick={async() => {
                            await sendJSONToAPI({
                                url: "/api/admin/game-state",
                                method: "PATCH",
                                body: JSON.stringify({ data: { phase: num } })
                            })
                            refetch({})
                        }}
                    >
                        {num}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}