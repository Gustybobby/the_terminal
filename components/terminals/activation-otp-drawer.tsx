"use client"

import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { sendJSONToAPI } from "@/tools/apiHandler";
import { useToast } from "../ui/use-toast";
import { FaCircleExclamation } from "react-icons/fa6";
import AirlineActivationOTP from "./airline-activation-otp";
import { FaCheckCircle } from "react-icons/fa";

export function ActivationOTPDrawer({ terminalId }: { terminalId: number }) {
    const { toast } = useToast()
    const [secret, setSecret] = useState("")
    return (
        <Drawer>
            <DrawerTrigger className="border-2 p-4 border-black rounded-lg hover:bg-gray-200 transition-colors text-black mb-4">
                Fill Activation Code
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Fill in the activation code</DrawerTitle>
                    <AirlineActivationOTP
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
                                url: `/api/terminals/${terminalId}/effects`,
                                method: "POST",
                                body: JSON.stringify({ data: { airlineSecret: secret }})
                            })
                            if(res.message === "ERROR"){
                                toast({
                                    description: (
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2">
                                                <FaCircleExclamation className="text-lg"/>
                                                <span className="font-bold text-lg">Incorrect Activation Code</span>
                                            </div>
                                        </div>
                                    ),
                                    variant: "destructive",
                                    duration: 3000,
                                })
                            } else {
                                toast({
                                    description: (
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2">
                                                <FaCheckCircle className="text-lg"/>
                                                <span className="font-bold text-lg">Success</span>
                                            </div>
                                        </div>
                                    ),
                                    variant: "default",
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