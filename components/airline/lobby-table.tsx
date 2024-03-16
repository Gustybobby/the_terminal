"use client"

import type { Session } from "next-auth"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import type { CrewTableData } from "@/types/airline"

export default function LobbyTable({ tableData, session }: {
    tableData: CrewTableData[]
    session: Session
}){
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
                    <TableCell className={styles.cell(row.name === session.user.name)}>
                        {row.airlineRole === "Co_pilot"? "Co-pilot" : row.airlineRole}
                    </TableCell>
                    <TableCell className={styles.cell(row.name === session.user.name)}>
                        {row.name}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const styles = {
    cell: (highlight: boolean) => [
       highlight? "font-bold text-blue-500" : "font-medium"
    ].join(" ")
}