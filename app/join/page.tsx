import JoinSection from "@/components/join/join-section";
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils";
import prisma from "@/prisma-client";
import { redirect } from "next/navigation";

export default async function JoinPage(){
    const session = await getServerAuthSession()
    if(!session?.user.id){
        redirect("/")
    }
    if(session.user.role === "STAFF"){
        redirect("/status/terminals")
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        },
        select: {
            airlineId: true
        }
    })
    if(user.airlineId != null){
        redirect("/airlines")
    }
    return (
        <main className="text-black h-screen bg-gradient-to-b from-blue-400 to-blue-300 w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-extrabold text-center">Join an Airline</h1>
            <h2 className="text-xl font-semibold mb-2">Ask nannies for your code</h2>
            <JoinSection/>
        </main>
    )
}