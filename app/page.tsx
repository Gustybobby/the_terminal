import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
    return (
        <main className="text-black h-screen">
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
            <div className="h-full flex flex-col justify-center items-center -translate-y-4">
                <h1 className="text-6xl md:text-8xl text-center font-extrabold leading-tight tracking-tighter drop-shadow-2xl">
                    The Terminal
                </h1>
                <h2 className="text-lg font-semibold mb-2">
                    by SIIT Insight Camp 2024
                </h2>
                <Link
                    className={buttonVariants({ variant: "outline" })}
                    href="/join"
                >
                    Play Now
                </Link>
            </div>
        </main>
    )
}
