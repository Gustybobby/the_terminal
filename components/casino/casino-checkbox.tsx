"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { CasinoSelectData } from "@/types/terminal";
import type { Dispatch, SetStateAction } from "react";

export default function CheckboxDemo({
  is_playing,
  index,
  setTableData,
}: {
  is_playing: boolean;
  index: number;
  setTableData: Dispatch<SetStateAction<CasinoSelectData[]>>;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="checkbox"
        onCheckedChange={(checked) =>
          setTableData((tableData) => {
            const newTableData = tableData.map((row, i) => {
              return i === index
                ? { ...row, is_playing: Boolean(checked)}
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
