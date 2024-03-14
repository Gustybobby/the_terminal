import JoinSection from "@/components/join/join-section";

export default function JoinPage(){
    return (
        <main className="text-black h-screen bg-gradient-to-b from-blue-400 to-blue-300 w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-extrabold text-center">Join an Airline</h1>
            <h2 className="text-xl font-semibold mb-2">Ask nannies for your code</h2>
            <JoinSection/>
        </main>
    )
}