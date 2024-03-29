"use client"

import type { AdminData } from "@/types/admin"
import type { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "../../../ui/card"
import { IoPeopleCircleSharp } from "react-icons/io5"
import { TICKUNIT } from "@/modules/routine"
import AirlinesDropdown from "../../../terminals/airlines-dropdown"
import { sendJSONToAPI } from "@/tools/apiHandler"

export default function TerminalsColumn({ admin, refetch }: {
    admin: AdminData
    refetch: Dispatch<SetStateAction<{}>>
}){
    return (
        <div className="h-full border border-black shadow-lg rounded-lg p-2 flex flex-col items-center overflow-y-auto">
            <div className="w-full h-fit p-1 grid grid-cols-1 gap-1 items-center rounded-lg shadow-lg">
            <h1 className="font-bold text-2xl">Terminals</h1>
                {admin.terminals.map((terminal) => (
                    <Card key={terminal.id+"_CARD"} className="p-2">
                        <CardTitle className="text-lg">
                            {terminal.id}. {terminal.title}
                        </CardTitle>
                        <CardDescription>
                            Owned by: {terminal.capturedBy?.title ?? "None"}
                        </CardDescription>
                        <CardContent className="flex items-center justify-between space-x-1 text-lg py-1">
                            <div className="flex items-center">
                                <IoPeopleCircleSharp/>
                                <span className="font-semibold">{terminal.passengerRate} / {terminal.unitTick*TICKUNIT/1000}s</span>
                            </div>
                            <AirlinesDropdown
                                airlines={admin.airlines}
                                ownerId={-1}
                                terminalId={terminal.id}
                                onClick={async(airlineId, terminalId) => {
                                    await sendJSONToAPI({
                                        url: `/api/terminals/${terminalId}`,
                                        method: "POST",
                                        body: JSON.stringify({ data: airlineId })
                                    })
                                    refetch({})
                                }}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}