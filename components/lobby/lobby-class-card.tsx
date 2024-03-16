import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import type { Faction } from "@/types/terminal";

export default function ClassCard({
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
          <div className="w-full flex flex-row">
            <div className="w-full ml-2 flex flex-col items-start">
              <CardTitle className="w-full text-left text-xl">
                {faction.name}
              </CardTitle>
              <CardDescription className="w-full">
                <div className="w-full flex flex-row justify-between space-x-2">
                  <div className="font-bold">{faction.ability_name}</div>
                  <div
                    className={`${
                      faction.type.includes("Debuff") ||
                      faction.type.includes("Sabotage")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {faction.type}
                  </div>
                </div>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
