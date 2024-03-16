"use client";

import { useState } from "react";
import StatusCard from "@/components/status/status-card";
import StatusDrawerContent from "@/components/status/status-drawer-content";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import type { UserTerminalData } from "@/types/terminal"
import useAllTerminals from "../hooks/useAllTerminals";
import { LoadingSpinner } from "../ui/loading-spinner";
import useCaptureToast from "../hooks/useCaptureToast";

export default function StatusCardGroup() {
  const [clickedTerminalIndex, setClickedTerminalIndex] = useState<number | null>(null);
  const { terminals } = useAllTerminals({ refreshRate: 5000 })
  useCaptureToast()
  
  if(terminals === "error"){
    return <></>
  }
  if(terminals === "loading"){
    return (
      <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner className="size-24"/>
      </div>
    )
  }
  return (
    <Drawer>
      {terminals.map((terminal: UserTerminalData, i:number) => (
        <DrawerTrigger
          key={`trigger-${terminal.id}`}
          className="mb-2"
          onClick = {() => {setClickedTerminalIndex(i)}}
        >
          <StatusCard key={terminal.id} terminal={terminal} className="hover:bg-gray-200 transition-colors" />
        </DrawerTrigger>
      ))}
      { clickedTerminalIndex !== null && <StatusDrawerContent terminal={terminals[clickedTerminalIndex]}  className = ""/>}
    </Drawer>
  );
}
