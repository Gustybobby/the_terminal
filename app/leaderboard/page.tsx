import LeaderTable from "@/components/leaderboard/leader-table";
import NavBar from "@/components/navbar/nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";

export default async function LeaderboardPage(){
    const session = await getServerAuthSession()
    if(session?.user.role !== "ADMIN"){
        redirect("/")
    }
    return (
        <>
            <Toaster/>
            <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
                <NavBar child="leaderboard"/>
                <div className="w-11/12 my-4 md:w-1/2 flex flex-col p-2 rounded-lg shadow-lg bg-white min-h-[85vh]">
                    <LeaderTable/>
                </div>
            </main>
        </>
    )
}