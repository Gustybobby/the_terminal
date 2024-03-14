import { type AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/prisma-client";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        })
    ],
    callbacks: {
        async signIn({ profile }){
            if(!profile?.email){
                return false
            }
            const user = await prisma.user.findUnique({
                where:{
                    email: profile.email
                },
                select:{
                    id: true
                }
            })
            if(!user){
                await prisma.user.create({
                    data:{
                        email: profile.email,
                        name: profile.name
                    }
                })
                console.log("Added",profile.email,"to database")
            }
            console.log(profile.email,"signed in")
            return true
        },
        async jwt({ token }){
            const user = await prisma.user.findUnique({
                where:{
                    email: token.email ?? ""
                },
                select:{
                    id: true,
                    role: true,
                }
            })
            return { ...token, id: user?.id, role: user?.role }
        },
        async session({ session, token }){
            session.user.id = token.id
            session.user.role = token.role
            return session
        }
    },
}

export const getServerAuthSession = () => getServerSession(authOptions)