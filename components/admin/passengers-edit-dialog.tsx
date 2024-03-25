"use client"

import type { Airline } from "@prisma/client"
import EditFields from "../passengers/edit-fields"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { buttonVariants } from "../ui/button"

export default function PassengersEditDialog({ open, close, airline }: {
    open: boolean
    close: () => void
    airline: Airline | undefined
}){
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {airline?.title} Passengers
                    </AlertDialogTitle>
                    <EditFields airlineId={airline?.id ?? -1}/>
                </AlertDialogHeader>
                <AlertDialogCancel
                    onClick={() => close()}
                    className={buttonVariants({ variant: "destructive" })}
                >
                    Close
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}