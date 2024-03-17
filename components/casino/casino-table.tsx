"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CasinoTableData } from "@/types/terminal";
import { Session } from "next-auth";
// import LobbyDropDownMenu from "./lobby-dropdown-role";
import type { Dispatch, SetStateAction } from "react";
import CasinoButton from "./casino-button-inc";
import CasinoWinButton from "./casino-button-multi";

export default function LobbyTable({
  className,
  tableData,
  setTableData,
  currentPot,
}: {
  className: string;
  tableData: CasinoTableData[];
  setTableData: Dispatch<SetStateAction<CasinoTableData[]>>;
  currentPot: number;
}) {
  const winConditions = [
    { name: "", multiplier: 4 },
    { name: "", multiplier: 3 },
    { name: "", multiplier: 2 },
    { name: "", multiplier: 1 },
  ];

  return (
    <Table className={`bg-white ${className}`}>
      <TableHeader className="font-bold">
        <TableRow>
          <TableHead className="w-1/5">Airline</TableHead>
          <TableHead className="w-1/12">P_ID</TableHead>
          <TableHead className="w-1/5">Ps</TableHead>
          <TableHead className="w-1/5">Pot</TableHead>
          <TableHead className="w-2/10">Function</TableHead>
          {/* 
          <TableHead className="w-1/5">Raise</TableHead>
          <TableHead className="w-1/5">Multiplier</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-center">
              {row.airline_name}
            </TableCell>
            <TableCell className="font-medium text-center">
              {row.player_id}
            </TableCell>
            <TableCell className="font-medium text-center">
              {row.initial_cost}
            </TableCell>
            <TableCell className="font-medium text-center">
              {row.this_pot}
            </TableCell>
            <TableCell className="font-medium">
              {/* <CasinoInput
                initialCost={row.initial_cost}
                setTableData={setTableData}
                index={index}
              /> */}
              <div className="flex flex-col">
                <CasinoButton
                  budget_inc={10}
                  index={index}
                  setTableData={setTableData}
                  className="w-12 bg-red-400 mb-1"
                />
                <div>
                  {winConditions.map((winCondition,index) => {
                    return (
                      <CasinoWinButton key={winCondition.name+"_"+index}
                        multiplier={winCondition.multiplier}
                        pot={currentPot}
                        index={index}
                        setTableData={setTableData}
                        className="w-12 bg-green-400 my-1"
                      />
                    );
                  })}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
