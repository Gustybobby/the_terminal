"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { LobbyTableData } from "@/types/airline";
import { Session } from "next-auth";

export default function LobbyTable({ session }: { session: Session }) {
  const [tableData, setTableData] = useState<LobbyTableData[]>([
    { role: "Captain", name: "Napat 1" },
    { role: "Co-Pilot", name: "Napat 2" },
    { role: "Crew", name: "Napat 3" },
    { role: "Crew", name: "Napat 4" },
    { role: "Crew", name: "Napat 5" },
    { role: "Crew", name: "Napat 6" },
  ]);
  // useEffect(() => {
  //     fetch("/api/airline/lobby")
  //         .then(res => res.json())
  //         .then(data => setTableData(data.data))

  //     const interval = setInterval(() => {
  //         fetch("/api/airline/lobby")
  //             .then(res => res.json())
  //             .then(data => setTableData(data.data))
  //     }, 5000)
  //     return () => clearInterval(interval)
  // },[])
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
            <TableCell
              className={
                row.name === session.user.name
                  ? "font-bold text-blue-600"
                  : "font-medium"
              }
            >
              {row.role}
            </TableCell>
            <TableCell
              className={
                row.name === session.user.name ? "font-bold text-blue-600" : ""
              }
            >
              {row.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
