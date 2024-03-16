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
import { Session } from "next-auth";
import LobbyDropDownMenu from "./lobby-dropdown-role";
import type { Dispatch, SetStateAction} from "react";

export default function LobbyTable({
  session,
  className,
  tableData,
  setTableData,
}: {
  session: Session;
  className: string;
  tableData: LobbyTableData[];
  setTableData: Dispatch<SetStateAction<LobbyTableData[]>>;
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
                row.name === session.user.name
                  ? "font-bold text-blue-600"
                  : "font-medium"
              }
            >
              <LobbyDropDownMenu
                role={row.role}
                setTableData={setTableData}
                index={index}
              />
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
