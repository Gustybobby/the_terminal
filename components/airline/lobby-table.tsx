"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import type { LobbyTableData } from "@/types/lobbyTableData"

export default function LobbyTable(){

    const [tableData, setTableData] = useState<LobbyTableData[]>([])
    useEffect(() => {
        fetch("/api/airline/lobby")
            .then(res => res.json())
            .then(data => setTableData(data.data))

        const interval = setInterval(() => {
            fetch("/api/airline/lobby")
                .then(res => res.json())
                .then(data => setTableData(data.data))
        }, 5000)
        return () => clearInterval(interval)
    },[])
    return (
        <Table className="bg-white">
            <TableHeader className="font-bold">
                <TableRow>
                    <TableHead className="w-1/3">Role</TableHead>
                    <TableHead className="w-2/3">Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.map((row, index) => (
                <TableRow key={index}>
                    <TableCell className="font-medium">{row.role}</TableCell>
                    <TableCell>{row.name}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}