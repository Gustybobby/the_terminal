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

export default function LobbySecretDrawer({
  flagSecret,
  className,
}: {
  flagSecret: string | undefined;
  className: string
}) {
  return (
    <Drawer>
      <DrawerTrigger className={`${className}`}>
        View airline code
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Airline Secret</DrawerTitle>
          <DrawerDescription>
            Please show this to your airline to join
          </DrawerDescription>
          <div className="text-4xl font-semibold leading-none tracking-tight">
            {flagSecret}
          </div>
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
