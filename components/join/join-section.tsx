"use client"

import { useState } from "react"
import JoinOTP from "./join-otp"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function JoinSection(){
    const [value, setValue] = useState("")
    const router = useRouter()
    return (
        <div className="flex flex-col items-center space-y-2">
            <JoinOTP setValue={setValue}/>
            <Button
                variant={"outline"}
                disabled={value.length !== 6}
                className={value.length == 6? "border-black" : ""}
                onClick={() => router.push("/airline")}
            > 
                Join
            </Button>
        </div>
    )
}