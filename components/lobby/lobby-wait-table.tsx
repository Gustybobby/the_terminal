"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { LobbyTableData } from "@/types/airline";

export default function LobbyTable({
  className,
  tableData,
}: {
  className?: string;
  tableData: LobbyTableData[];
}) {
  return (
    <Table className={`bg-white ${className}`}>
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
              className="font-medium"
            >
            {row.airlineRole === "Co_pilot"? "Co-pilot" : row.airlineRole}
            </TableCell>
            <TableCell>
              {row.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
