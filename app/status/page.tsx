import NavBar from "@/components/navbar/nav-bar";
import prisma from "@/prisma-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IoPeopleCircleSharp } from "react-icons/io5";
import Image from "next/image";

export default async function TerminalStatusPage(){
    const terminals = await prisma.terminal.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            passengerRate: true,
            capturedBy: {
                select: {
                    id: true
                },
            },
        }
    })
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
            <NavBar child="status"/>
            <div className="h-fit grid grid-cols-2 md:grid-cols-4 gap-4 m-2">
                {terminals.map((terminal) => (
                <Card className="size-44" key={terminal.id}>
                    <CardHeader className="p-3 pb-1">
                        <div className="flex justify-between items-center">
                            <Image
                                className="rounded-full size-10 border-2 border-black"
                                src={"/rsc/terminal"+terminal.id+".jpg"}
                                alt={terminal.id+" profile"}
                                width={50}
                                height={50}
                            />
                            <div>
                                <CardTitle className="text-xl">{terminal.title}</CardTitle>
                                <CardDescription>{terminal.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: {terminal.capturedBy?.id ?? "None"}</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p className="flex items-center font-bold">{terminal.passengerRate}&nbsp;<IoPeopleCircleSharp/>/ 5s</p>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </main>
    )
}