"use client"

import type { AdminAirline } from "@/types/admin"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

export default function AirlineDropdown({ airline }: { airline: AdminAirline }){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-slate-300 rounded-lg px-2 hover:bg-gray-200 transition-colors">
                Edit
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{airline.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Passengers</DropdownMenuItem>
                <DropdownMenuItem>Effects</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}