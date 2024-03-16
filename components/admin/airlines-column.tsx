"use client"

import type { AdminData } from "@/types/admin"
import type { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card"
import { IoPeopleCircleSharp } from "react-icons/io5"
import { FaCheckCircle, FaStopCircle } from "react-icons/fa"
import AirlineDropdown from "./airline-dropdown"

export default function AirlinesColumn({ admin, refetch }: {
    admin: AdminData
    refetch: Dispatch<SetStateAction<{}>>
}){
    return (
        <div className="h-full border border-black shadow-lg rounded-lg p-2 flex flex-col items-center overflow-y-auto">
            <div className="w-full h-fit p-1 grid grid-cols-1 gap-1 items-center rounded-lg shadow-lg">
                <h1 className="font-bold text-2xl">Airlines</h1>
                {admin.airlines.map((airline) => (
                    <Card key={airline.id+"_CARD"} className="p-2">
                        <CardTitle className="text-lg">
                            {airline.title}
                        </CardTitle>
                        <CardDescription>
                            {airline.class}
                        </CardDescription>
                        <CardContent className="flex items-center justify-between space-x-1 text-lg py-1">
                            <div className="flex items-center">
                                <IoPeopleCircleSharp/>
                                <span className="font-semibold">{airline.passengers}</span>
                            </div>
                            <AirlineDropdown airline={airline}/>
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
        </div>
    )
}