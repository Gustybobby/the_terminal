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

import type { UserTerminalData } from "@/types/terminal";

export default function StatusDrawerContent({
  terminal,
  className,
}: {
  terminal: UserTerminalData;
  className: string;
}) {
  const [userFlag, setUserFlag] = useState<string>("");
  // Send Request to there
  //   function onSubmit(data: z.infer<typeof FormSchema>) {
  //     toast({
  //       title: "You submitted the following values:",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //         </pre>
  //       ),
  //     })
  const { toast } = useToast();
  // If incorrect pass, Cooldown => Try Again
  // If Success
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
          onClick={() => {
            // Call Hook to check flag
            console.log(userFlag);
            const error = true;
            const cooldown = false;
            if (error || cooldown) {
              toast({
                // title: "Failure",
                description: (
                  <div className="text-black flex flex-row items-center">
                    <IoIosAlert className="text-red-700 text-3xl mr-2" />
                    <div className=" text-md ">
                      {cooldown
                        ? "You are on cooldown"
                        : `Failed capturing ${terminal.title}`}
                    </div>
                  </div>
                ),
                // description: cooldown ? "You are on cooldown" : "",
                duration: 2000,
                variant: "destructive",
                className: "bg-red-300 border-0 font-bold",
              });
            } else {
              toast({
                // title: "Success!",
                description: (
                  <div className="flex flex-row items-center">
                    <FaCheckCircle className="text-green-900 text-2xl mr-2" />
                    <div className=" text-md ">{`Successfully Captured ${terminal.title}`}</div>
                  </div>
                ),
                // title: `Successfully captured ${terminal.title}`,
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
