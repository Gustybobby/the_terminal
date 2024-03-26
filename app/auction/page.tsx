import ClassCarousel from "@/components/auction/class-carousel";
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";

export default async function AuctionPage(){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        redirect("/")
    }
    return (
        <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
            <h1 className="text-5xl font-bold my-8">Class Auction</h1>
            <ClassCarousel/>
        </main>
    )
}