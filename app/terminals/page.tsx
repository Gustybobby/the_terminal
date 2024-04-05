import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import prisma from "@/prisma-client";
import { redirect } from "next/navigation";

export default async function TerminalsPage(){
    const session = await getServerAuthSession()
    if(session?.user.role === "STAFF"){
        const { terminalId } = await prisma.user.findUniqueOrThrow({
            where: {
                id: session.user.id ?? ""
            },
            select: {
                terminalId: true
            }
        })
        if(!terminalId){
            redirect("/")
        }
        redirect(`/terminals/${terminalId}`)
    }
    redirect(`/status`)
}