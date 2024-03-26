"use client"

import type { SelectAirline } from "@/types/airline"
import { buttonVariants } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export default function AirlinesDropdown({ airlines, ownerId, terminalId, ownerOnTrigger = false, onClick }: {
    airlines: SelectAirline[]
    ownerId: number
    terminalId: number
    ownerOnTrigger?: boolean
    onClick: (airlineId: number | null, terminalId: number | null) => Promise<void>
}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={buttonVariants({ variant: "outline" })}
            >
                {ownerOnTrigger? (airlines.find((airline) => airline.id === ownerId)?.title ?? "None") : "Select Airline"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {airlines.concat({ id: null, title: "None" }).filter((airline) => airline.id !== ownerId).map((airline) => (
                <DropdownMenuItem
                    key={airline.id+"_MENU_ITEM"}
                    onClick={async() => {
                        await onClick(airline.id, terminalId)
                    }}
                >
                    {airline.title}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}