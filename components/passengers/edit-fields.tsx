"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { sendJSONToAPI } from "@/tools/apiHandler"

export default function EditFields({ airlineId }: { airlineId: number }){
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
                            body: JSON.stringify({ data: { passengers: value }})
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
                            body: JSON.stringify({ data: { passengers: { increment: value } }})
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
                            body: JSON.stringify({ data: { passengers: { multiply: value } }})
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
                            body: JSON.stringify({ data: { passengers: { divide: value } }})
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