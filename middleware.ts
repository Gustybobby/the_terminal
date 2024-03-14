import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    async function middleware(req){
        
    }
)

export const config = {
    matcher: [
        "/join"
    ]
}