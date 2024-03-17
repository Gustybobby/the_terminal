"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { sendJSONToAPI } from "@/tools/apiHandler"
import { useState } from "react"

export default function BCETContent({ airlineId }: {
    airlineId: number,
}){
    const [open, setOpen] = useState(false)
    return (
        <>
            <DropdownMenuContent>
                <DropdownMenuLabel>Use Global</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        Use
                </DropdownMenuItem>
            </DropdownMenuContent>
            <AlertDialog open={open}>
                <AlertDialogContent className="w-5/6 rounded-lg">
                    <AlertDialogHeader>
                    <AlertDialogTitle>
                        Use Lab Explosion?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async() => {
                            setOpen(false)
                            await sendJSONToAPI({
                                url: `/api/airlines/${airlineId}/effects`,
                                method: "POST",
                                body: JSON.stringify({ data: {} })
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