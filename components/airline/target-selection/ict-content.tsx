"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { sendJSONToAPI } from "@/tools/apiHandler"
import type { AirlineData } from "@/types/airline"
import { useState } from "react"

export default function ICTContent({ airlineId, allAirlines }: {
    airlineId: number,
    allAirlines: AirlineData["allAirlines"]
}){
    const [selectedAirline, setSelectedAirline] = useState<number | null>(null);
    return (
        <>
            <DropdownMenuContent>
                <DropdownMenuLabel>Choose Airline</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {allAirlines.map((al) => (
                    <DropdownMenuItem
                        key={al.id}
                        onClick={() => setSelectedAirline(al.id)}
                    >
                        {al.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
            <AlertDialog open={selectedAirline !== null}>
                <AlertDialogContent className="w-5/6 rounded-lg">
                    <AlertDialogHeader>
                    <AlertDialogTitle>
                        Use <span className="text-blue-500">Disable</span> on {allAirlines.find((al) => al.id === selectedAirline)?.title}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setSelectedAirline(null)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async() => {
                            setSelectedAirline(null)
                            await sendJSONToAPI({
                                url: `/api/airlines/${airlineId}/effects`,
                                method: "POST",
                                body: JSON.stringify({ data: { applyToId: selectedAirline }})
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