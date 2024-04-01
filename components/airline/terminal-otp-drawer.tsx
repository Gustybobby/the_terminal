"use client"

import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import TerminalCaptureOTP from "./terminal-capture-otp";
import { sendJSONToAPI } from "@/tools/apiHandler";
import { useToast } from "../ui/use-toast";
import { FaCircleExclamation } from "react-icons/fa6";

export function TerminalOTPDrawer({ airlineId }: { airlineId: number }) {
    const { toast } = useToast()
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
                        onClick={async(e) => {
                            const button = e.target as HTMLButtonElement
                            button.disabled = true
                            const res = await sendJSONToAPI({
                                url: "/api/terminals/secret",
                                method: "POST",
                                body: JSON.stringify({ data: { airlineId, secret }})
                            })
                            if(res.message === "ERROR"){
                                toast({
                                    description: (
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2">
                                                <FaCircleExclamation className="text-lg"/>
                                                <span className="font-bold text-lg">Incorrect Flag</span>
                                            </div>
                                        </div>
                                    ),
                                    variant: "destructive",
                                    duration: 3000,
                                })
                            }
                            setSecret("")
                            button.disabled = false
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