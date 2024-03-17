"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { sendJSONToAPI } from "@/tools/apiHandler"
import type { CaptureData } from "@/types/airline"
import { useState } from "react"

export default function MSMEContent({ airlineId, captures }: {
    airlineId: number,
    captures: CaptureData[]
}){
    const [selectedTerminal, setSelectedTerminal] = useState<number | null>(null);
    return (
        <>
            <DropdownMenuContent>
                <DropdownMenuLabel>Choose Terminal</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {captures.map((capture) => (
                    <DropdownMenuItem
                        key={capture.id}
                        onClick={() => setSelectedTerminal(capture.id)}
                    >
                        {capture.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
            <AlertDialog open={selectedTerminal !== null}>
                <AlertDialogContent className="w-5/6 rounded-lg">
                    <AlertDialogHeader>
                    <AlertDialogTitle>
                        Use <span className="text-blue-500">Logistics Boost</span> on {captures.find((capture) => capture.id === selectedTerminal)?.title}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setSelectedTerminal(null)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async() => {
                            setSelectedTerminal(null)
                            await sendJSONToAPI({
                                url: `/api/airlines/${airlineId}/effects`,
                                method: "POST",
                                body: JSON.stringify({ data: { terminalId: selectedTerminal }})
                            })
                        }}
                    >
                        Do it
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}