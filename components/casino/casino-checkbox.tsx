"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { CasinoPlayData } from "@/types/terminal";
import type { Dispatch, SetStateAction } from "react";

export default function CheckboxDemo({
  playing,
  index,
  setTableData,
}: {
  playing: boolean;
  index: number;
  setTableData: Dispatch<SetStateAction<CasinoPlayData[] | "loading">>;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="checkbox"
        checked={playing}
        onCheckedChange={(checked) =>
          setTableData((tableData) =>
            tableData === "loading"? "loading" :
            tableData.map((row, i) => {
              return i === index
                ? { ...row, playing: Boolean(checked)}
                : { ...row };
            })
          )
        }
      />
    </div>
  );
}
