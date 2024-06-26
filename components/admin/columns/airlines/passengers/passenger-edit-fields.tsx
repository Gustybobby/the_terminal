"use client"

import { useState } from "react"
import { Button } from "../../../../ui/button"
import { Input } from "../../../../ui/input"
import { sendJSONToAPI } from "@/tools/apiHandler"

export default function PassengerEditFields({ airlineId, passengers }: { airlineId: number, passengers: number }){
    const [value, setValue] = useState<number | "">("")
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full grid grid-cols-4 gap-2">
                <Input
                    value={value}
                    type="number"
                    placeholder="Number"
                    className="col-span-4"
                    onChange={(e) => setValue(e.target.value === ""? "" : +e.target.value)}
                />
                <Button
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: `/api/airlines/${airlineId}`,
                            method: "PATCH",
                            body: JSON.stringify({ data: { passengers: Math.round(+value) }})
                        })
                    }}
                    disabled={value === ""}
                >
                    Set
                </Button>
                <Button
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: `/api/airlines/${airlineId}`,
                            method: "PATCH",
                            body: JSON.stringify({ data: { passengers: Math.round(passengers+(+value)) }})
                        })
                    }}
                    disabled={value === ""}
                >
                    Add
                </Button>
                <Button
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: `/api/airlines/${airlineId}`,
                            method: "PATCH",
                            body: JSON.stringify({ data: { passengers: Math.round(passengers*(+value)) } })
                        })
                    }}
                    disabled={value === ""}
                >
                    Multiply
                </Button>
                <Button
                    onClick={async() => {
                        await sendJSONToAPI({
                            url: `/api/airlines/${airlineId}`,
                            method: "PATCH",
                            body: JSON.stringify({ data: { passengers: Math.round(passengers/(+value)) }})
                        })
                    }}
                    disabled={value === ""}
                >
                    Divide
                </Button>
            </div>
        </div>
    )
}