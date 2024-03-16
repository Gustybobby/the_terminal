"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import * as React from "react";
import StatusCard from "@/components/status/status-card";
import StatusOTP from "@/components/status/status-otp";
import { useToast } from "@/components/ui/use-toast";

import { FaCheckCircle } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

// React Icon for fail, sucess
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import type { Faction } from "@/types/terminal";
import { sendJSONToAPI } from "@/tools/apiHandler";
import { Session } from "next-auth";
import { AirlineRole } from "@prisma/client";

export default function LobbyDrawerContent({
  faction,
  className,
  airlineRole,
  setSelectedClass,
}: {
  faction: Faction;
  className: string;
  airlineRole: AirlineRole;
  setSelectedClass: Dispatch<SetStateAction<string | null>>;
}) {
  const handleClick = () => {
    // Add API to update chosen faction and 
    setSelectedClass(faction.abbreviation);
  };
  return (
    <DrawerContent className={` ${className}`}>
      <DrawerHeader>
        <DrawerTitle>{faction.name}</DrawerTitle>
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
          {airlineRole === AirlineRole.Co_pilot ? (
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
