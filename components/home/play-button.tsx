"use client"

import Link from "next/link"
import { buttonVariants } from "../ui/button"

export default function PlayButton(){
    if (typeof window === "undefined"){
        return <></>
    }
    return (
        <Link
            className={buttonVariants({ variant: "outline" })}
            href="/join"
        >
            Play Now
        </Link>
    )
}