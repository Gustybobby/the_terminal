"use client";

import { Button } from "@/components/ui/button";
import type { CasinoTableData } from "@/types/terminal";
import type { Dispatch, SetStateAction } from "react";

export default function CasinoButton({
  multiplier,
  pot,
  index,
  setTableData,
  className,
}: {
  multiplier: number;
  pot: number;
  index: number;
  setTableData: Dispatch<SetStateAction<CasinoTableData[]>>;
  className: string;
}) {
  return (
    <div className={`flex items-center space-x-2 `}>
      <Button
        className={className}
        id="checkbox"
        onClick={() =>
          setTableData((tableData) => {
            const newTableData = tableData.map((row, i) => {
              return i === index
                ? { ...row, initial_cost: row.initial_cost + pot * multiplier }
                : { ...row };
            });
            newTableData.forEach((row) => {
              row.this_pot = 0;
            });
            return newTableData;
          })
        }
      >{`${multiplier}X`}</Button>
    </div>
  );
}
