import EffectWrapper from "@/components/effects/effect-wrapper";
import LeaderTable from "@/components/leaderboard/leader-table";
import NavBar from "@/components/navbar/nav-bar";
import { Toaster } from "@/components/ui/toaster";

export default async function LeaderboardPage(){
    return (
        <>
            <Toaster/>
            <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
                <NavBar child="leaderboard"/>
                <div className="w-11/12 my-4 md:w-1/2 flex flex-col p-2 rounded-lg shadow-lg h-[80vh] bg-white">
                    <EffectWrapper>
                        <LeaderTable/>
                    </EffectWrapper>
                </div>
            </main>
        </>
    )
}