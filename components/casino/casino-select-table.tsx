"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import type { Dispatch, SetStateAction } from "react";
import CasinoCheckbox from "./casino-checkbox";
import CasinoInput from "./casino-input";

import { CasinoSelectData } from "@/types/terminal";

export default function LobbyTable({
  className,
  tableData,
  setTableData,
}: {
  className: string;
  tableData: CasinoSelectData[];
  setTableData: Dispatch<SetStateAction<CasinoSelectData[]>>;
}) {
  return (
    <Table className={`bg-white ${className}`}>
      <TableHeader className="font-bold">
        <TableRow>
          <TableHead className="w-1/12">Airline</TableHead>
          <TableHead className="w-1/12">P_ID</TableHead>
          <TableHead className="w-2/12">Initial_P</TableHead>
          <TableHead className="w-1/12">Play</TableHead>
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
            <TableCell className="flex flex-col font-medium items-center">
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
