import * as React from "react";

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

import { buttonVariants } from "../ui/button";
    
export function TerminalDrawer({ flagSecret }: { flagSecret: string }) {
  return (
    <Drawer>
      <DrawerTrigger className="font-light border-2 p-4 border-black rounded-lg hover:bg-gray-200 transition-colors text-black mb-4">
        Check Terminal Secret
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terminal Secret</DrawerTitle>
          <DrawerDescription>Please keep this as a secret</DrawerDescription>
          <div className = "text-4xl font-semibold leading-none tracking-tight">{flagSecret}</div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className={buttonVariants({ variant: "default" })}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
