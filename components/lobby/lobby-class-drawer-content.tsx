"use client";

import { buttonVariants } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { Faction } from "@/types/terminal";
import { sendJSONToAPI } from "@/tools/apiHandler";

export default function LobbyDrawerContent({
  faction,
  className,
  editable,
  airlineId,
  refetch,
}: {
  airlineId: number
  faction: Faction;
  className?: string;
  editable: boolean
  refetch: Dispatch<SetStateAction<{}>>
}) {
  const handleClick = async() => {
    await sendJSONToAPI({
      url: `/api/airlines/${airlineId}`,
      method: "PATCH",
      body: JSON.stringify({ data: { class: faction.abbreviation }})
    })
    refetch({})
  };
  return (
    <DrawerContent className={className}>
      <DrawerHeader>
        <DrawerTitle>{faction.abbreviation}</DrawerTitle>
        <DrawerDescription className="flex flex-col">
          <div className="items-center font-medium">
            Ability Name : {faction.ability_name}
          </div>
          <div className="items-center font-medium">
            Ability Type : {faction.type}
          </div>
          <div className="items-center font-medium mb-2">
            Usage : {`${faction.use} per phase`}
          </div>
          <div className="mb-2 ">
            <div className="items-center font-medium mb-2">Description</div>
            {faction.description}
          </div>
          {editable? (
            <DrawerClose
              className={`${buttonVariants({
                variant: "default",
              })} my-2 border-2 border-black w-full`}
              onClick={handleClick}
            >
              Select This Class
            </DrawerClose>
          ) : (
            <></>
          )}
        </DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  );
}
