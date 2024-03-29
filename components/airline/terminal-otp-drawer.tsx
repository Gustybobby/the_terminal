"use client"

import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import TerminalCaptureOTP from "./terminal-capture-otp";
import { sendJSONToAPI } from "@/tools/apiHandler";

export function TerminalOTPDrawer({ airlineId }: { airlineId: number }) {
    const [secret, setSecret] = useState("")
    return (
        <Drawer>
            <DrawerTrigger className="border-2 p-4 border-black rounded-lg hover:bg-gray-200 transition-colors text-black mb-4">
                Capture Terminal
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Fill in the secret from terminal staff</DrawerTitle>
                    <TerminalCaptureOTP
                        value={secret}
                        setValue={setSecret}
                        className="w-full flex justify-center"
                    />
                </DrawerHeader>
                <DrawerFooter>
                    <Button
                        variant="outline"
                        onClick={async() => {
                            await sendJSONToAPI({
                                url: "/api/terminals/secret",
                                method: "POST",
                                body: JSON.stringify({ data: { airlineId, secret }})
                            })
                            setSecret("")
                        }}
                        disabled={secret.length !== 6}
                    >
                        Submit
                    </Button>
                    <DrawerClose className={buttonVariants({ variant: "default" })}>
                        Close
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}