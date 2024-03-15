import { redirect } from "next/navigation"
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils"
import prisma from "@/prisma-client"

export default async function AirlinesPage(){
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
    if(user.airlineId === null){
        redirect("/join")
    }
    redirect(`/airlines/${user.airlineId}`)
}