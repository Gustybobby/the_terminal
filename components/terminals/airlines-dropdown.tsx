"use client"

import type { SelectAirline } from "@/types/airline"
import { buttonVariants } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { sendJSONToAPI } from "@/tools/apiHandler"

export default function AirlinesDropdown({ airlines, ownerId, terminalId, onSuccess }: {
    airlines: SelectAirline[]
    ownerId: number
    terminalId: number
    onSuccess?: () => void
}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={buttonVariants({ variant: "outline" })}
            >
                Select Airline
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {airlines.concat({ id: null, title: "None" }).filter((airline) => airline.id !== ownerId).map((airline) => (
                <DropdownMenuItem
                    key={airline.id+"_MENU_ITEM"}
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: `/api/terminals/${terminalId}`,
                            method: "POST",
                            body: JSON.stringify({ data: airline.id })
                        })
                        onSuccess?.()
                    }}
                >
                    {airline.title}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}