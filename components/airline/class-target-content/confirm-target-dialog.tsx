"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { FACTION_MAP } from "@/game/faction"
import type { AirlineClass } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"
import type { TargetData } from "../skills-section"
import { sendJSONToAPI } from "@/tools/apiHandler"
import { useToast } from "@/components/ui/use-toast"
import { FaCircleExclamation } from "react-icons/fa6"

export default function ConfirmTargetDialog({ target, setTarget, airlineClass, airlineId }: {
    target: TargetData | null
    setTarget: Dispatch<SetStateAction<TargetData | null>>
    airlineClass: AirlineClass
    airlineId: number
}){
    const { toast } = useToast()
    return (
        <AlertDialog open={!!target}>
            <AlertDialogContent className="max-w-80 md:max-w-96 rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">
                        Use <span className="text-blue-600 inline-block">{FACTION_MAP[airlineClass].ability_name}</span> on&nbsp;
                        <span className="text-red-600 inline-block">
                            {target?.title} {target?.target === "A" && `(Airline ${target?.id})`}
                        </span>?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="bg-red-400 hover:bg-red-300"
                        onClick={() => setTarget(null)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-green-400 hover:bg-green-300 text-black"
                        onClick={async(e) => {
                            const button = e.target as HTMLButtonElement
                            button.disabled = true
                            const res = await sendJSONToAPI({
                                url: `/api/airlines/${airlineId}/effects`,
                                method: "POST",
                                body: JSON.stringify({ data: {
                                    special: true,
                                    applyToId: target?.target === "A"? target.id : null,
                                    terminalId: target?.target === "T"? target.id : null,
                                    option: 1,
                                }})
                            })
                            if(res.message === "ERROR"){
                                toast({
                                    description: (
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2">
                                                <FaCircleExclamation className="text-lg"/>
                                                <span className="font-bold text-lg">Cannot use this right now</span>
                                            </div>
                                        </div>
                                    ),
                                    variant: "destructive",
                                    duration: 3000,
                                })
                            }
                            setTarget(null)
                        }}
                    >
                        Use
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}