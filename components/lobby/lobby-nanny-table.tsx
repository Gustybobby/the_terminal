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
import LobbyDropDownMenu from "./lobby-dropdown-role";
import type { Dispatch, SetStateAction } from "react";

export default function LobbyNannyTable({
  airlineId,
  className,
  tableData,
  refetch,
}: {
  airlineId: number
  className: string;
  tableData: LobbyTableData[];
  refetch: Dispatch<SetStateAction<{}>>;
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
              className={
                   "font-medium"
              }
            >
              <LobbyDropDownMenu
                airlineId={airlineId}
                airlineRole={row.airlineRole}
                userId={row.id}
                refetch={refetch}
              />
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
