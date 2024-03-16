import { redirect } from "next/navigation"
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils"
import prisma from "@/prisma-client"
import { GAME_ID } from "@/modules/routine"

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
            airlineId: true,
            airline: {
                select: {
                    ready: true
                }
            }
        }
    })
    if(user.airlineId === null){
        redirect("/join")
    }
    const gameState = await prisma.gameState.findUniqueOrThrow({
        where: {
            id: GAME_ID
        },
        select: {
            start: true
        }
    })
    if(user.airline?.ready && gameState.start){
        redirect(`/airlines/${user.airlineId}`)
    }
    redirect(`/lobby/${user.airlineId}`)
}