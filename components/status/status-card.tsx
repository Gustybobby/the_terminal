import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoPeopleCircleSharp } from "react-icons/io5";
import Image from "next/image";
import * as React from "react";
import type { UserTerminalData } from "@/types/terminal"

export default function StatusCard({ terminal, className }: { terminal: UserTerminalData ,className:string }) {
  return (
          <Card className={`w-full ${className}`}>
            <CardHeader className="p-3 pb-1">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <Image
                    className="rounded-full size-10 border-2 border-black"
                    src={"/rsc/terminal" + terminal.id + ".jpg"}
                    alt={terminal.id + " profile"}
                    width={50}
                    height={50}
                  />
                  <div className="ml-2 flex flex-col items-start">
                    <CardTitle className=" text-xl">{terminal.title}</CardTitle>
                    <CardDescription>{terminal.description}</CardDescription>
                  </div>
                </div>
                <p className="flex items-center font-bold">
                  {terminal.passengerRate}&nbsp;
                  <IoPeopleCircleSharp />/ {terminal.unitTime}s
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex p-3 pb-1">
                <p>Owned by: {terminal.capturedBy?.title ?? "None"}</p>
              </CardContent>
          </Card>
  );
}