"use client";

import { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";

export default function AuthProvider({ children, session }: { children: React.ReactNode, session: Session | null }){
    if(typeof window === undefined){
        return <></>
    }
    if(session && !session.user.id){
        signOut()
    }
    return(
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}