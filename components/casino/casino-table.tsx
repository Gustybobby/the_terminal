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
import { CasinoTableData } from "@/types/terminal";
import { Session } from "next-auth";
// import LobbyDropDownMenu from "./lobby-dropdown-role";
import type { Dispatch, SetStateAction} from "react";
import CasinoButton from "./casino-button"
export default function LobbyTable({
    session,
    className,
    tableData,
    setTableData,
  }: {
    session: Session;
    className: string;
    tableData: CasinoTableData[];
    setTableData: Dispatch<SetStateAction<CasinoTableData[]>>;
}) {

  return (
    <Table className={`bg-white ${className}`}>
      <TableHeader className="font-bold">
        <TableRow>
          <TableHead className="w-1/4">Airline</TableHead>
          <TableHead className="w-1/4">Player</TableHead>
          <TableHead className="w-1/4">Initial Cost</TableHead>
          <TableHead className="w-1/4">Playing</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.airline_name}</TableCell>
            <TableCell>{row.player_id}</TableCell>
            <TableCell>
              {/* <CasinoInput
                initialCost={row.initial_cost}
                setTableData={setTableData}
                index={index}
              /> */}
            </TableCell>
            <TableCell className="font-medium">
            {/* <CasinoInput
                initialCost={row.initial_cost}
                setTableData={setTableData}
                index={index}
              /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
