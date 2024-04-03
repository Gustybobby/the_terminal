"use client"

import { buttonVariants } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

export function AirlineSecretDrawer({ airlineSecret }: { airlineSecret: string }) {
    return (
        <Drawer>
            <DrawerTrigger className={buttonVariants({ variant: "outline", className: "bg-green-300 hover:bg-green-400" })}>
                Option 1
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Airline Activation Code</DrawerTitle>
                    <DrawerDescription>Please keep this as a secret</DrawerDescription>
                    <div className = "text-4xl font-semibold leading-none tracking-tight">{airlineSecret}</div>
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