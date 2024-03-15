"use client"

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function ForceSignOut({ session }: { session: Session | null }){
    if(!session?.user.id){
        signOut()
    }
    return <></>
}