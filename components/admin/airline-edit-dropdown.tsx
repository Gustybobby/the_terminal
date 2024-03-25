"use client"

import type { Airline } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import type { Dispatch, SetStateAction } from "react"

export default function AirlineEditDropdown({ airline, setSelected }: {
    airline: Airline
    setSelected: Dispatch<SetStateAction<{
        id: number;
        item: "P" | "E";
    } | null>>
}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-slate-300 rounded-lg px-2 hover:bg-gray-200 transition-colors bg-white">
                Edit
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{airline.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelected({ id: airline.id, item: "P" })}>
                    Passengers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelected({ id: airline.id, item: "E" })}>
                    Effects
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}