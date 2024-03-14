import * as React from "react";

import { Button } from "@/components/ui/button";
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
import prisma from "@/prisma-client";
    
export async function TerminalDrawer({terminalId} : {terminalId : number}) {
  const terminal = await prisma.terminal.findFirst({
    where : {
      id: terminalId
    },
    select: {
      currentFlagSecret: true
    }
})
  const terminalFlag = terminal?.currentFlagSecret;
  return (
    <Drawer>
      <DrawerTrigger className="font-light border-2 p-4 border-slate-300 rounded-lg">Check Terminal Secret</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terminal Secret</DrawerTitle>
          <DrawerDescription>Please keep this as a secret</DrawerDescription>
          <div className = "text-4xl font-semibold leading-none tracking-tight">{terminalFlag}</div>
        </DrawerHeader>
        <DrawerFooter>
          {/* <Button>Submit</Button> */}
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
