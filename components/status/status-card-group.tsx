"use client";

import StatusCard from "@/components/status/status-card";
import type { TerminalData } from "@/types/terminal"
import useAllTerminals from "../hooks/useAllTerminals";
import { LoadingSpinner } from "../ui/loading-spinner";
import useCaptureToast from "../hooks/useCaptureToast";
import { TICKUNIT } from "@/modules/routine";
import { Color } from "@prisma/client";

export default function StatusCardGroup() {
  const { terminals } = useAllTerminals({ refreshRate: TICKUNIT })
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
    <div className="grid grid-cols-2 gap-2">
      {terminals.map((terminal: TerminalData, i:number) => (
        <StatusCard
          key={terminal.id}
          terminal={terminal}
          className={terminal.capturedBy? styles[terminal.capturedBy.color] : ""}
        />
      ))}
    </div>
  );
}

const styles: { [key in Color]: string } = {
  RED: "bg-red-400",
  PINK: "bg-pink-400",
  YELLOW: "bg-yellow-400",
  ORANGE: "bg-orange-400",
  GREEN: "bg-green-400",
  BLUE: "bg-blue-500",
  PURPLE: "bg-purple-400",
  BROWN: "bg-yellow-600",
  AQUA: "bg-cyan-400",
  BEIGE: "bg-orange-200",
}
