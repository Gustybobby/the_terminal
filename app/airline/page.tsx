import LobbyTable from "@/components/airline/lobby-table";
import SkillsSection from "@/components/airline/skills-section";
import NavBar from "@/components/navbar/nav-bar";
import { IoPeopleCircleSharp } from "react-icons/io5";

export default async function Airline(){
    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
            <NavBar child="airline"/>
            <div className="w-11/12 my-4 md:w-1/2 flex flex-col rounded-lg shadow-lg bg-white">
                <h1 className="text-center font-extrabold text-3xl bg-gray-200 rounded-t-lg py-2">Airline 1</h1>
                <div className="p-2">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl text-center font-bold">
                            30,203,253
                        </h2>
                        <IoPeopleCircleSharp className="text-center text-5xl"/>
                        <span className="font-semibold">≈ 5000 passengers / 5s</span>
                        <ul className="w-full flex flex-col items-start text-sm mt-2 mr-2">
                            <li>+ 1000/30s from Terminal 1</li>
                            <li>+ 2000/5s from Terminal 2</li>
                            <li>+ 500/15s from Terminal 3</li>
                            <li>- 20/5s from Terminal 4</li>
                            <li>- 200/10s from Airline 2&apos;s Debuff</li>
                        </ul>
                    </div>
                    <SkillsSection/>
                    <h2 className="ml-4 font-bold text-2xl mb-2">Members</h2>
                    <LobbyTable/>
                </div>
            </div>
        </main>
    )
}