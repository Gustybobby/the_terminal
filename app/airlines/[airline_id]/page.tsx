import Interactable from "@/components/airline/interactable";
import NavBar from "@/components/navbar/nav-bar";
import { getServerAuthSession } from "../../api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import prisma from "@/prisma-client";
import EffectWrapper from "@/components/effects/effect-wrapper";
import { Toaster } from "@/components/ui/toaster";

export default async function Airline({ params }: { params: { airline_id: string }}){
    const session = await getServerAuthSession()
    if(!session?.user.id){
        redirect("/")
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        },
        select: {
            airlineRole: true,
            airlineId: true,
        }
    })
    if(user.airlineRole !== "Co_pilot" && session.user.role !== "ADMIN"){
        redirect("/")
    }
    if(user.airlineId !== +params.airline_id){
        redirect("/airlines")
    }
    const airline = await prisma.airline.findUniqueOrThrow({
        where: {
            id: +params.airline_id
        },
        select: {
            title: true
        }
    })
    return (
        <>
            <Toaster/>
            <main className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
                <NavBar child="airline"/>
                <div className="w-11/12 my-4 md:w-1/2 flex flex-col rounded-lg shadow-lg bg-white">
                    <h1 className="text-center font-extrabold text-3xl bg-gray-200 rounded-t-lg py-2">{airline.title} Airline</h1>
                    <EffectWrapper
                        className="flex flex-col"
                        airlineId={session.user.role === "ADMIN"? +params.airline_id : undefined}
                    >
                        <Interactable
                            airlineId={params.airline_id}
                            session={session}
                            isCaptain={user.airlineRole === "Captain"}
                        />
                    </EffectWrapper>
                </div>
            </main>
        </>
    )
}
