"use client";

import { Input } from "@/components/ui/input";
import type { CasinoPlayData } from "@/types/terminal";
import type { Dispatch, SetStateAction } from "react";

export default function CasinoInput({ initialCost, index, setTableData }: {
    initialCost: number;
    index: number;
    setTableData: Dispatch<SetStateAction<CasinoPlayData[] | "loading">>;
}) {
    return (
        <div className="flex items-center space-x-2">
            <Input
                className="border-black"
                type="number"
                placeholder="Number"
                step="50"
                min={100}
                value={initialCost}
                onChange={(e) =>
                setTableData((tableData) =>
                    tableData === "loading"? "loading" :
                        tableData.map((row, i) => {
                            return i === index
                                ? { ...row, pot: +e.target.value }
                                : { ...row };
                        })
                )}
            />
        </div>
    )
}
