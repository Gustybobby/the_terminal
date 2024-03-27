"use client"

import { signOut, useSession } from "next-auth/react";

export default function ForceSignOut(){
    const { data: session } = useSession()
    if(session && !session?.user.id){
        signOut()
    }
    return <></>
}