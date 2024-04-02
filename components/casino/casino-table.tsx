"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { Dispatch, SetStateAction } from "react";
import type { CasinoPlayData } from "@/types/terminal";
import CasinoPassengersInput from "./casino-passengers-input";

export default function CasinoTable({ className, tableData, setTableData }: {
    className?: string;
    tableData: CasinoPlayData[];
    setTableData: Dispatch<SetStateAction<CasinoPlayData[] | "loading">>;
}){
    return (
        <Table className={`bg-white ${className}`}>
            <TableHeader className="font-bold">
                <TableRow>
                    <TableHead>Airline</TableHead>
                    <TableHead>P</TableHead>
                    <TableHead>Pot</TableHead>
                    <TableHead>Increment</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.map((row, index) => (
                <TableRow key={index}>
                    <TableCell className="font-medium">
                        {row.title}
                    </TableCell>
                    <TableCell className="font-medium">
                        {row.passengers}
                    </TableCell>
                    <TableCell className="font-medium">
                        {row.pot}
                    </TableCell>
                    <TableCell>
                        <CasinoPassengersInput airlineId={row.id}/>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
