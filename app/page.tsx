import Image from "next/image"
import { getServerAuthSession } from "./api/auth/[...nextauth]/_utils"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default async function Home() {
    const session = await getServerAuthSession()

    return (
        <main className="relative text-black h-screen">
            <Image
                src="/rsc/airplane.gif"
                alt="BG Image"
                fill
                unoptimized
                sizes="100vw"
                style={{
                    objectFit: "cover",
                    zIndex: -1,
                }}
                quality={100}
            />
            <div className="h-full flex flex-col justify-center items-center -translate-y-10">
                <h1 className="text-6xl md:text-8xl text-center font-extrabold leading-tight tracking-tighter drop-shadow-2xl">
                    The Terminal
                </h1>
                <h2 className="text-lg font-semibold mb-2">
                    by SIIT Insight Camp 2024
                </h2>
                <div className="space-x-2">
                    {session?.user.role === "USER" || session?.user.role === "ADMIN" &&
                    <Link
                        className={buttonVariants({ variant: "default" })}
                        href={"/airlines"}
                    >
                        Access Airline
                    </Link>
                    }
                    {session?.user.role === "STAFF" || session?.user.role === "ADMIN" &&
                    <Link
                        className={buttonVariants({ variant: "default" })}
                        href={"/terminals"}
                    >
                        Access Terminal
                    </Link>
                    }
                    {session?.user.role === "ADMIN" &&
                    <Link
                        className={buttonVariants({ variant: "default" })}
                        href={"/admin"}
                    >
                        Access Admin
                    </Link>
                    }
                </div>
            </div>
        </main>
    )
}
