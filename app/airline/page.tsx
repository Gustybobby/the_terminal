import Interactable from "@/components/airline/interactable";
import NavBar from "@/components/navbar/nav-bar";
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import prisma from "@/prisma-client";

export default async function Airline(){
    const session = await getServerAuthSession()
    if(!session?.user.id){
        redirect("/")
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        },
        select: {
            airlineId: true
        }
    })
    if(user.airlineId == null){
        redirect("/join")
    }
    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
            <NavBar child="airline"/>
            <div className="w-11/12 my-4 md:w-1/2 flex flex-col rounded-lg shadow-lg bg-white">
                <h1 className="text-center font-extrabold text-3xl bg-gray-200 rounded-t-lg py-2">Airline 1</h1>
                <Interactable session={session}/>
            </div>
        </main>
    )
}