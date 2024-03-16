"use client";

import { useState } from "react";

import * as React from "react";
import StatusCard from "@/components/status/status-card";
import StatusDrawerContent from "@/components/status/status-drawer-content";

import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { UserTerminalData } from "@/types/terminal"
import useAllTerminals from "../hooks/useAllTerminals";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useToast } from "../ui/use-toast";
import { FaFlag } from "react-icons/fa";

export default function StatusCardGroup() {
  const [clickedTerminalIndex, setClickedTerminalIndex] = useState<number | null>(null);
  const { terminals } = useAllTerminals({ refreshRate: 5000 })
  const { toast } = useToast()
  React.useEffect(() => {
    if(typeof terminals === "string"){
      return
    }
    for(const terminal of terminals){
      for (const record of terminal.capturedByRecords){
        toast({
          description: (
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <FaFlag className="text-lg"/>
                <span className="font-bold text-lg">{record.airline.title} captures {terminal.title}</span>
              </div>
              <span className="font-normal text-sm">{(new Date(record.capturedAt)).toLocaleString()}</span>
            </div>
          ),
          duration: 2000,
        })
      }
    }
  },[terminals])
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
