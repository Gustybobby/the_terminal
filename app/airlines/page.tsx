import { redirect } from "next/navigation"
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils"
import prisma from "@/prisma-client"

export default async function AirlinesPage(){
    const session = await getServerAuthSession()
    if(!session?.user.id){
        redirect("/")
    }
    if(session.user.role === "STAFF"){
        redirect("/terminals")
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        },
        select: {
            airlineId: true,
            airline: {
                select: {
                    ready: true
                }
            }
        }
    })
    if(user.airlineId === null){
        redirect("/")
    }
    redirect(`/airlines/${user.airlineId}`)
}