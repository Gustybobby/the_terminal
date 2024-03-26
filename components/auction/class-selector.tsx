"use client"

import type { AirlineClass } from "@prisma/client"
import AirlinesDropdown from "../terminals/airlines-dropdown"
import { sendJSONToAPI } from "@/tools/apiHandler"
import type { AirlineClassAuction } from "@/types/airline"
import type { Dispatch, SetStateAction } from "react"

export default function ClassSelector({ airlines, airlineClass, index, refetch }: {
    airlines: AirlineClassAuction[],
    airlineClass: AirlineClass
    index: number
    refetch: Dispatch<SetStateAction<{}>>
}){
    const ownerId = getOwnerId(airlines, airlineClass, index)
    return (
        <AirlinesDropdown
            airlines={airlines}
            ownerId={ownerId}
            terminalId={-1}
            ownerOnTrigger={true}
            onClick={async(airlineId, _) => {
                await sendJSONToAPI({
                    url: `/api/airlines/${airlineId ?? ownerId}`,
                    method: "PATCH",
                    body: JSON.stringify({ data: { class: (airlineId === null? "None" : airlineClass) }})
                })
                refetch({})
            }}
        />
    )
}

function getOwnerId(airlines: AirlineClassAuction[], airlineClass: AirlineClass, index: number){
    const classOwned = airlines.filter((airline) => airline.class === airlineClass)
    if (index > 4){
        return classOwned.length < 2? -1 : (classOwned.at(-1)?.id ?? -1)
    }
    return classOwned.at(0)?.id ?? -1
}