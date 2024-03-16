"use client";

import { Button } from "@/components/ui/button";
import type { CasinoTableData } from "@/types/terminal";
import type { Dispatch, SetStateAction } from "react";

export default function CheckboxDemo({
  budget_inc,
  index,
  setTableData,
  className,
}: {
  budget_inc: number;
  index: number;
  setTableData: Dispatch<SetStateAction<CasinoTableData[]>>;
  className:string
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        id="checkbox"
        onClick={() =>
          setTableData((tableData) => {
            const newTableData = tableData.map((row, i) => {
              return i === index
                ? { ...row, budget: row.budget + budget_inc }
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
    </div>
  );
}
