"use client";

import StatusCard from "@/components/status/status-card";
import type { TerminalData } from "@/types/terminal"
import useAllTerminals from "../hooks/useAllTerminals";
import { LoadingSpinner } from "../ui/loading-spinner";
import useCaptureToast from "../hooks/useCaptureToast";
import { TICKUNIT } from "@/modules/routine";
import { Color } from "@prisma/client";

export default function StatusCardGroup() {
  const { terminals, currentTick } = useAllTerminals({ refreshRate: TICKUNIT })
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {terminals.map((terminal: TerminalData) => (
        <StatusCard
          key={terminal.id}
          terminal={terminal}
          className={terminal.capturedBy? styles[terminal.capturedBy.color] : ""}
          currentTick={currentTick}
        />
      ))}
      <StatusCard
        className="lg:col-span-2"
        terminal={{
          secret: "",
          id: 11,
          title: "Casino",
          status: "Open",
          description: "Casino",
          passengerRate: 0,
          unitTick: 0,
          lastUpdateTick: 0,
          capturedBy: null
        }}
        currentTick={0}
      />
    </div>
  );
}

const styles: { [key in Color]: string } = {
  DARK_ORANGE: "bg-orange-400",
  MAGENTA: "bg-pink-400",
  PINK: "bg-pink-200",
  YELLOW: "bg-yellow-200",
  LIGHT_ORANGE: "bg-orange-200",
  GREEN: "bg-green-200",
  BLUE: "bg-blue-300",
  PURPLE: "bg-purple-300",
  BROWN: "bg-yellow-600",
  AQUA: "bg-cyan-200",
}
