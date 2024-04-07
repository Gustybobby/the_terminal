"use client"

import type { AdminData } from "@/types/admin"
import { useState, type Dispatch, type SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../../../ui/card"
import { IoPeopleCircleSharp } from "react-icons/io5"
import { FaCheckCircle, FaStopCircle } from "react-icons/fa"
import AirlineEditDropdown from "./airline-edit-dropdown"
import PassengersEditDialog from "./passengers/passengers-edit-dialog"
import EffectsDialog from "./effects/effects-dialog"
import type { Color } from "@prisma/client"

export default function AirlinesColumn({ admin, refetch }: {
    admin: AdminData
    refetch: Dispatch<SetStateAction<{}>>
}){
    const [selected, setSelected] = useState<{ id: number, item: "P" | "E" } | null>(null)
    return (
        <div className="h-full border border-black shadow-lg rounded-lg p-2 flex flex-col items-center overflow-y-auto">
            <div className="w-full h-fit p-1 grid grid-cols-1 gap-1 items-center rounded-lg shadow-lg">
                <h1 className="font-bold text-2xl">Airlines</h1>
                {admin.airlines.map((airline) => (
                    <Card key={airline.id+"_CARD"} className={`p-2 ${styles[airline.color]}`}>
                        <CardTitle className="text-lg">
                            {airline.id}. {airline.title}
                        </CardTitle>
                        <CardDescription className="text-black">
                            {airline.class}
                        </CardDescription>
                        <CardContent className="flex items-center justify-between space-x-1 text-lg py-1">
                            <div className="flex items-center">
                                <IoPeopleCircleSharp/>
                                <span className="font-semibold">{airline.passengers}</span>
                            </div>
                            <AirlineEditDropdown airline={airline} setSelected={setSelected}/>
                        </CardContent>
                        <CardFooter className="py-1 flex justify-between">
                            {airline.ready?
                                <div className="flex items-center">
                                    <FaCheckCircle className="text-green-600 text-xl mr-2" />
                                    <span className="text-green-600 font-bold">Ready</span>
                                </div>
                                :
                                <div className="flex items-center">
                                    <FaStopCircle className="text-red-600 text-xl mr-2" />
                                    <span className="text-red-600 font-bold">Not Ready</span>
                                </div>
                            }
                            <span>PIN: {airline.airlineSecret}</span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <PassengersEditDialog
                open={selected?.item === "P"}
                close={()=>setSelected(null)}
                airline={admin.airlines.find((airline) => airline.id === selected?.id)}
            />
            <EffectsDialog
                open={selected?.item === "E"}
                close={()=>setSelected(null)}
                airline={admin.airlines.find((airline) => airline.id === selected?.id)}
            />
        </div>
    )
}

const styles: { [key in Color]: string } = {
    DARK_ORANGE: "bg-orange-400",
    MAGENTA: "bg-pink-400",
    PINK: "bg-pink-200",
    YELLOW: "bg-yellow-200",
    LIGHT_ORANGE: "bg-orange-200",
    GREEN: "bg-green-200",
    BLUE: "bg-blue-300",
    PURPLE: "bg-purple-300",
    BROWN: "bg-yellow-300",
    AQUA: "bg-cyan-200",
  }