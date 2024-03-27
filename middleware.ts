import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    async function middleware(req){
        if(!req.nextauth.token?.id){
            return NextResponse.redirect(`${req.nextUrl.origin}/api/auth/signin`)
        }
    }
)

export const config = {
    matcher: [
        "/admin/:path*",
        "/",
    ]
}