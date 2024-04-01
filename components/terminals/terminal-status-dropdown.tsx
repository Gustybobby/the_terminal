"use client"

import { TerminalStatus } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { statusEmoji } from "../status/status-emoji"
import { buttonVariants } from "../ui/button"
import { FaChevronDown } from "react-icons/fa"
import { sendJSONToAPI } from "@/tools/apiHandler"
import type { Dispatch, SetStateAction } from "react"

export default function TerminalStatusDropdown({ status, terminalId, refetch }: {
    status: TerminalStatus
    terminalId: number
    refetch: Dispatch<SetStateAction<{}>>
}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
                {statusEmoji[status]} {status}&nbsp;<FaChevronDown/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.values(TerminalStatus).map((avStatus) => (
                <DropdownMenuItem
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: `/api/terminals/${terminalId}`,
                            method: "PATCH",
                            body: JSON.stringify({ data: { status: avStatus }})
                        })
                        refetch({})
                    }}
                >
                    {statusEmoji[avStatus]} {avStatus}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}