"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { sendJSONToAPI } from "@/tools/apiHandler";

export default function CasinoPassengersInput({ airlineId }: {
    airlineId: number;
}) {
    const value = useRef(0)
    return (
        <div className="flex items-center space-x-1">
            <Input
                className="border-black"
                type="number"
                placeholder="Number"
                step="50"
                onChange={(e) => {
                    value.current = +e.target.value
                }}
            />
            <Button
                className="p-2 bg-green-500 hover:bg-green-400"
                onClick={async(e) => {
                    const button = e.target as HTMLButtonElement
					button.disabled = true
                    await sendJSONToAPI({
                        url: "/api/casino",
                        method: "POST",
                        body: JSON.stringify({ data: { airline_id: airlineId, passengerAmount: value.current }})
                    })
                    button.disabled = false
                }}
            >
                +
            </Button>
        </div>
    )
}
