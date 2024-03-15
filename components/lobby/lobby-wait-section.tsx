"use client";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import LobbyWaitTable from "./lobby-wait-table";
import type { LobbyTableData } from "@/types/airline";

export default function LobbyWait({ session }: { session: Session }) {
  const [tableData, setTableData] = useState<LobbyTableData[]>([
    { role: "Captain", name: "Napat 1" },
    { role: "Co_Pilot", name: "Napat 2" },
    { role: "Crew", name: "Napat 3" },
    { role: "Crew", name: "Napat 4" },
    { role: "Crew", name: "Napat 5" },
    { role: "Crew", name: "Napat 6" },
  ]);
// UseEffect for sorting for captain 

//   onClick={() =>
//     setTableData((tableData) => {
//       const newTableData = tableData.map((row, i) => {
//         return i === index
//           ? { ...row, role: role.value }
//           : { ...row };
//       });
//       newTableData.sort((a, b) => {
//         return (
//           roles.findIndex((role) => a.role === role.value) -
//           roles.findIndex((role) => b.role === role.value)
//         );
//       });
//       return newTableData;
//     })
//   }
  return (
    <div className="p-1">
      <h2 className="ml-4 font-bold text-2xl mb-2">Members</h2>
      <LobbyWaitTable
        session={session}
        className={""}
        tableData={tableData}
        setTableData={setTableData}
      />
    </div>
  );
}
