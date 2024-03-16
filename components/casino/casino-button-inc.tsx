"use client";

import { Button } from "@/components/ui/button";
import type { CasinoTableData } from "@/types/terminal";
import type { Dispatch, SetStateAction } from "react";

export default function CasinoButton({
  budget_inc,
  index,
  setTableData,
  className,
}: {
  budget_inc: number;
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
              return i === index && row.initial_cost - budget_inc >= 0
                ? {
                    ...row,
                    initial_cost: row.initial_cost - budget_inc,
                    this_pot: row.this_pot + budget_inc,
                  }
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
      >
        {budget_inc}
      </Button>
    </div>
  );
}
