import Link from "next/link";
import { BsFillAirplaneFill } from "react-icons/bs";

export default function NavBar({ child }: { child: string }){
    return (
        <header className="bg-white w-full h-12 flex items-center p-2 shadow-lg">
            <h1 className="font-extrabold text-2xl text-white mx-1 p-1 bg-purple-700 rounded-full"><BsFillAirplaneFill/></h1>
            <nav className="flex items-center gap-6 ml-2">
                <Link
                    href={"/status"}
                    className={styles.link(child === "status")}
                >
                    Terminals
                </Link>
                <Link
                    href={"/airline"}
                    className={styles.link(child === "airline")}
                >
                    Airline
                </Link>
                <Link
                    href={"/leaderboard"}
                    className={styles.link(child === "leaderboard")}
                >
                    Leaderboard
                </Link>
            </nav>
        </header>
    )
}

const styles = {
    link: (active: boolean) => [
        "font-bold transition-colors ",
        active? "text-black" : "text-gray-500 hover:text-gray-700",
    ].join(" ")
}