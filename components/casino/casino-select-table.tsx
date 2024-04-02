"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { Dispatch, SetStateAction } from "react";
import CasinoCheckbox from "./casino-checkbox";
import CasinoInput from "./casino-input";
import { CasinoPlayData } from "@/types/terminal";

export default function CasinoSelectTable({ className, tableData, setTableData }: {
  className: string;
  tableData: CasinoPlayData[];
  setTableData: Dispatch<SetStateAction<CasinoPlayData[] | "loading">>;
}) {
  return (
    <Table className={`bg-white ${className}`}>
      <TableHeader className="font-bold">
        <TableRow>
          <TableHead className="w-1/12">Airline</TableHead>
          <TableHead className="w-1/12">Available P</TableHead>
          <TableHead className="w-2/12">Initial P</TableHead>
          <TableHead className="w-1/12">Play</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.passengers}</TableCell>
            <TableCell>
              <CasinoInput
                initialCost={row.pot}
                setTableData={setTableData}
                index={index}
              />
            </TableCell>
            <TableCell className="flex flex-col font-medium items-center">
              <CasinoCheckbox
                playing={row.playing}
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
