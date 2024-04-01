"use client"

import type { Airline } from "@prisma/client"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../../../../ui/alert-dialog"
import { buttonVariants } from "../../../../ui/button"
import PassengerEditFields from "./passenger-edit-fields"

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
                    <PassengerEditFields airlineId={airline?.id ?? -1} passengers={airline?.passengers ?? 0}/>
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