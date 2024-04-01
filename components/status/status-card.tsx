import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IoPeopleCircleSharp } from "react-icons/io5";
import Image from "next/image";
import type { TerminalData } from "@/types/terminal"
import { TICKUNIT } from "@/modules/routine";
import { Progress } from "../ui/progress";
import type { TerminalStatus } from "@prisma/client";
import { statusEmoji } from "./status-emoji";

export default function StatusCard({ terminal, currentTick, className }: {
  terminal: TerminalData
  currentTick: number
  className?: string
}){
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="p-2 pb-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <Image
              className="rounded-full size-10 border-2 border-black"
              src={`/rsc/terminal-${terminal.id}.png`}
              alt={terminal.id + " profile"}
              width={50}
              height={50}
              quality={50}
            />
            <div className="ml-2 flex flex-col items-start">
              <CardTitle className="text-xl bg-white/40 px-2 rounded-lg border border-black">
                <span className={styles.status(terminal.status)}>
                  <span className="text-xl">
                    {statusEmoji[terminal.status]}
                  </span>
                  {terminal.status}
                </span>
                &nbsp;
                {terminal.title}
              </CardTitle>
              <CardDescription className="flex flex-col items-start text-black">{terminal.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center font-bold">
            {terminal.passengerRate}&nbsp;
            <IoPeopleCircleSharp />/ {terminal.unitTick*TICKUNIT/1000}s
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-2 pb-1 font-bold">
          {terminal.id !== 11 &&
            <>
              <span className="text-sm">{terminal.capturedBy? "Loading Passengers..." : "..."}</span>
              <Progress
                value={terminal.capturedBy? (currentTick - terminal.lastUpdateTick)/(terminal.unitTick)*100 : 0}
              />
            </>
          }
          <p>Owned by: {terminal.capturedBy?.title ?? "None"}</p>
        </CardContent>
    </Card>
  );
}

const styles = {
  status: (status: TerminalStatus) => [
    status === "Open"? "text-green-500" : "",
    status === "Playing"? "text-blue-500" : "",
    status === "Cooldown"? "text-red-500" : "",
    "text-base",
  ].join(" ")
}
