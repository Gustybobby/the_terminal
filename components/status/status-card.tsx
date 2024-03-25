import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IoPeopleCircleSharp } from "react-icons/io5";
import Image from "next/image";
import type { TerminalData } from "@/types/terminal"
import { TICKUNIT } from "@/modules/routine";

export default function StatusCard({ terminal, className }: { terminal: TerminalData ,className?: string }) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="p-3 pb-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <Image
              className="rounded-full size-10 border-2 border-black"
              src={`/rsc/terminal-${terminal.title}.png`}
              alt={terminal.id + " profile"}
              width={50}
              height={50}
              quality={50}
            />
            <div className="ml-2 flex flex-col items-start">
              <CardTitle className=" text-xl">{terminal.title}</CardTitle>
              <CardDescription className="flex flex-col items-start">{terminal.description.slice(0,16)+"..."}</CardDescription>
            </div>
          </div>
          <div className="flex items-center font-bold">
            {terminal.passengerRate}&nbsp;
            <IoPeopleCircleSharp />/ {terminal.unitTick*TICKUNIT/1000}s
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex p-3 pb-1 font-bold">
          <p>Owned by: {terminal.capturedBy?.title ?? "None"}</p>
        </CardContent>
    </Card>
  );
}
