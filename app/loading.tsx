import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading(){
    return (
        <main className="relative text-black h-screen bg-gradient-to-b from-blue-400 to-blue-300">
            <div className="h-full flex flex-col justify-center items-center -translate-y-4">
                <h1 className="text-6xl md:text-8xl text-center font-extrabold leading-tight tracking-tighter drop-shadow-2xl">
                    The Terminal
                </h1>
                <h2 className="text-lg font-semibold mb-2">
                    by SIIT Insight Camp 2024
                </h2>
                <LoadingSpinner className="size-24"/>
            </div>
        </main>
    )
}