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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import type { UserTerminalData } from "@/types/terminal";
import { sendJSONToAPI } from "@/tools/apiHandler";

export default function StatusDrawerContent({
  terminal,
  className,
}: {
  terminal: UserTerminalData;
  className: string;
}) {
  const [userFlag, setUserFlag] = useState<string>("");
  const { toast } = useToast();
  return (
    <DrawerContent className={` ${className}`}>
      <DrawerHeader>
        <DrawerTitle>{terminal.title}</DrawerTitle>
        <DrawerDescription>{terminal.description}</DrawerDescription>
        <div className="text-4xl font-semibold leading-none tracking-tight">
          {}
        </div>
      </DrawerHeader>
      <DrawerFooter className="flex flex-col items-center">
        <DrawerTitle>Capture This Terminal</DrawerTitle>
        <DrawerDescription>Enter The Flag and Submit</DrawerDescription>
        <StatusOTP
          value={userFlag}
          setValue={setUserFlag}
          className="justify-self-center"
        />
        <Button
          className={`border-2 border-black w-full`}
          variant="outline"
          disabled={userFlag.length !== 6}
          onClick={async() => {
            // Call Hook to check flag
            const res = await sendJSONToAPI({
              url: "/api/user/capture/"+terminal.id,
              method: "POST",
              body: JSON.stringify({ data: userFlag })
            })
            setUserFlag("")
            const error = res.message === "ERROR"
            const cooldown = res.message === "COOLDOWN";
            if (error || cooldown) {
              toast({
                description: (
                  <div className="text-black flex flex-row items-center">
                    <IoIosAlert className="text-red-700 text-3xl mr-2" />
                    <div className=" text-md ">
                      {cooldown
                        ? `You are on cooldown (${res.elapsed}s)`
                        : `Failed capturing ${terminal.title}`}
                    </div>
                  </div>
                ),
                duration: 2000,
                variant: "destructive",
                className: "bg-red-300 border-0 font-bold",
              });
            } else {
              toast({
                description: (
                  <div className="flex flex-row items-center">
                    <FaCheckCircle className="text-green-900 text-2xl mr-2" />
                    <div className=" text-md ">{`Successfully Captured ${terminal.title}`}</div>
                  </div>
                ),
                duration: 2000,
                variant: "default",
                className: "bg-green-300 font-bold",
              });
            }
          }}
        >
          Submit
        </Button>
        <DrawerClose
          className={`${buttonVariants({ variant: "default" })} w-full`}
        >
          Close
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
