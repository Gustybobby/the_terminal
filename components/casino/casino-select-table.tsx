"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Session } from "next-auth";
import type { Dispatch, SetStateAction } from "react";
import CasinoCheckbox from "./casino-checkbox";
import CasinoInput from "./casino-input";

import { CasinoSelectData } from "@/types/terminal";

export default function LobbyTable({
  session,
  className,
  tableData,
  setTableData,
}: {
  session: Session;
  className: string;
  tableData: CasinoSelectData[];
  setTableData: Dispatch<SetStateAction<CasinoSelectData[]>>;
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
              <CasinoInput
                initialCost={row.initial_cost}
                setTableData={setTableData}
                index={index}
              />
            </TableCell>
            <TableCell className="font-medium">
              <CasinoCheckbox
                is_playing={row.is_playing}
                setTableData={setTableData}
                index={index}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
