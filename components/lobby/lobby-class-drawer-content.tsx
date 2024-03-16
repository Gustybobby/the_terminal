"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";

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

export default function LobbyDrawerContent({
  faction,
  className,
}: {
    faction: Faction;
  className: string;
}) {

  return (
    <DrawerContent className={` ${className}`}>
      <DrawerHeader>
        <DrawerTitle>{faction.name}</DrawerTitle>
        <DrawerDescription className="flex flex-col">
            <div className="items-center">{faction.ability_name}</div>
            <div className="items-center">{faction.type}</div>
            <div className="items-center mb-2">{`${faction.use} per phase`}</div>
            {faction.description}
            </DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  );
}
