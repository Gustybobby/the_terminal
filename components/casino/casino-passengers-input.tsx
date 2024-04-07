"use client";

import { Input } from "@/components/ui/input";

export default function CasinoPassengersInput({ airlineId }: {
    airlineId: number;
}) {
    return (
        <div className="flex items-center space-x-1">
            <Input
                id={`airline_casino_${airlineId}`}
                className="border-black"
                type="number"
                placeholder="Number"
                step="50"
            />
        </div>
    )
}
