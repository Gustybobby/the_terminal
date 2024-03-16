import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import type { Faction } from "@/types/terminal";

export default function StatusCard({
  faction,
  className,
}: {
  faction: Faction;
  className: string;
}) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="p-3 pb-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            {/* <Image
                      className="rounded-full size-10 border-2 border-black"
                      src={"/rsc/faction" + faction.id + ".jpg"}
                      alt={faction.id + " profile"}
                      width={50}
                      height={50}
                    /> */}
            <div className="ml-2 flex flex-col items-start">
              <CardTitle className=" text-xl">{faction.name}</CardTitle>
              <CardDescription className="">
                <div className="w-full flex flex-row justify-between">
                  <div className="text-left font-bold ">{faction.ability_name}</div>
                  <div className="font-bold ">{faction.type}</div>
                </div>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
