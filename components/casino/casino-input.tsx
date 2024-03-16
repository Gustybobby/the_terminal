"use client";

import { Input } from "@/components/ui/input";
import type { CasinoSelectData } from "@/types/terminal";
import type { Dispatch, SetStateAction } from "react";

export default function CasinoInput({
  initialCost,
  index,
  setTableData,
}: {
  initialCost: number;
  index: number;
  setTableData: Dispatch<SetStateAction<CasinoSelectData[]>>;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        placeholder="Number"
        value={initialCost}
        onChange={(e) =>
          setTableData((tableData) => {
            const newTableData = tableData.map((row, i) => {
              return i === index
                ? { ...row, initial_cost: +(e.target.value)}
                : { ...row };
            });
            // newTableData.sort((a, b) => {
            //   return (
            //     roles.findIndex((role) => a.role === role.value) -
            //     roles.findIndex((role) => b.role === role.value)
            //   );
            // });
            return newTableData;
          })
        }
      />
      {/* <Checkbox
        id="terms"
        onClick={() =>
          setTableData((tableData) => {
            const newTableData = tableData.map((row, i) => {
              return i === index ? { ...row, is: is_playing } : { ...row };
            });
            // newTableData.sort((a, b) => {
            //   return (
            //     roles.findIndex((role) => a.role === role.value) -
            //     roles.findIndex((role) => b.role === role.value)
            //   );
            // });
            return newTableData;
          })
        }
      /> */}
    </div>
  );
}
