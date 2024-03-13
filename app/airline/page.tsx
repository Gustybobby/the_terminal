import LobbyTable from "@/components/airline/lobby-table";
import NavBar from "@/components/navbar/nav-bar";

export default async function Airline(){
    return (
        <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
            <NavBar child="airline"/>
            <div className="my-4 md:w-1/2 flex flex-col p-2 rounded-lg shadow-lg h-[80vh] bg-white">
                <h1 className="text-center font-extrabold text-3xl p-1">Airline 1</h1>
                <LobbyTable/>
            </div>
        </main>
    )
}