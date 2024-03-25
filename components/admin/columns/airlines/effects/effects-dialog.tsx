"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../../../../ui/alert-dialog"
import { buttonVariants } from "../../../../ui/button"
import EffectsEditFields from "./effects-edit-fields"
import type { Airline } from "@prisma/client"

export default function EffectsDialog({ open, close, airline }: {
    open: boolean
    close: () => void
    airline: Airline | undefined
}){
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {airline?.title} Effects
                    </AlertDialogTitle>
                    {airline &&
                    <EffectsEditFields
                        airlineId={airline.id}
                        airlineClass={airline.class}
                        skillUse={airline.skillUse}
                    />
                    }
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