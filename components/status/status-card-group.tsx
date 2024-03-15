"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";

import * as React from "react";
import StatusCard from "@/components/status/status-card";
import StatusOTP from "@/components/status/status-otp";
import StatusDrawerContent from "@/components/status/status-drawer-content";

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
import type { UserTerminalData } from "@/types/terminal"

export default function StatusCardGroup({ terminals }: { terminals: UserTerminalData[] }) {
  // Send Request to there
  const [clickedTerminalIndex, setClickedTerminalIndex] = useState<number>(0);
  return (
    <Drawer>
      {terminals.map((terminal: UserTerminalData, i:number) => (
        <DrawerTrigger
          key={`trigger-${terminal.id}`}
          className=""
          onClick = {() => {setClickedTerminalIndex(i)}}
        >
          <StatusCard key={terminal.id} terminal={terminal} className="mb-4" />
        </DrawerTrigger>
      ))}
      <StatusDrawerContent terminal={terminals[clickedTerminalIndex]}  className = ""/>
    </Drawer>
  );
}
