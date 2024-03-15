"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LobbyTableData } from "@/types/airline";

import { Session } from "next-auth";
import LobbyDropDownMenu from "./lobby-dropdown-role";
import LobbyNannyTable from "./lobby-nanny-table";
import { count } from "console";
export default function LobbyNannySection({ session }: { session: Session }) {
  // useEffect(() => {
  //     fetch("/api/airline/lobby")
  //         .then(res => res.json())
  //         .then(data => setTableData(data.data))

  //     const interval = setInterval(() => {
  //         fetch("/api/airline/lobby")
  //             .then(res => res.json())
  //             .then(data => setTableData(data.data))
  //     }, 5000)
  //     return () => clearInterval(interval)
  // },[])
  const [tableData, setTableData] = useState<LobbyTableData[]>([
    { role: "Captain", name: "Napat 1" },
    { role: "Co_Pilot", name: "Napat 2" },
    { role: "Crew", name: "Napat 3" },
    { role: "Crew", name: "Napat 4" },
    { role: "Crew", name: "Napat 5" },
    { role: "Crew", name: "Napat 6" },
  ]);
  const [correct, setCorrect] = useState<boolean>(
    tableData.filter((a) => a.role === "Captain").length === 1
  );
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setCorrect(tableData.filter((a) => a.role === "Captain").length === 1);
  }, [tableData]);

  useEffect(() => {
    if(!correct) {
        setReady(false);}
  }, [correct]);

  const handleClick = () => {
    setReady(!ready);
  };
  return (
    <div>
      <LobbyNannyTable
        session={session}
        className={"mb-4"}
        tableData={tableData}
        setTableData={setTableData}
      />
      <Button
        className={`${ready ?? "bg-green"} mt-8`}
        disabled={!correct}
        onClick={handleClick}
      >
        {`${!ready ? "Click when ready" : "Ready For Take Off"}`}
      </Button>
    </div>
  );
}
