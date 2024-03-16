"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import LobbyCard from "@/components/lobby/lobby-class-card";
import ClassDrawerContent from "@/components/lobby/lobby-class-drawer-content";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import type { Faction } from "@/types/terminal";
import type { AirlineClass } from "@prisma/client";
import { FACTIONS } from "@/game/faction";

export default function LobbyClassGroupSection({
  airlineId,
  airlineClass,
  editable,
  refetch,
}: {
  airlineId: number
  airlineClass: AirlineClass
  editable: boolean,
  refetch: Dispatch<SetStateAction<{}>>
}) {
  const [clickedFactionIndex, setClickedFactionIndex] = useState<number | null>(null);
  return (
    <Drawer>
      {FACTIONS.map((faction: Faction, i) => (
        <DrawerTrigger
          key={`trigger-${faction.name}`}
          className="mb-2 w-full"
          onClick={() => {
            setClickedFactionIndex(i);
          }}
        >
          <LobbyCard
            key={faction.id}
            faction={faction}
            className={`min-w-[2rem] w-full transition-colors ${airlineClass === faction.abbreviation? "bg-green-400 hover:bg-green-300" : "hover:bg-gray-200"}`}
          />
        </DrawerTrigger>
      ))}
      {clickedFactionIndex !== null && (
        <ClassDrawerContent
          refetch={refetch}
          airlineId={airlineId}
          faction={FACTIONS[clickedFactionIndex]}
          editable={editable}
        />
      )}
    </Drawer>
  );
}
