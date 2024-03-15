"use client"

import { useState } from "react"
import JoinOTP from "./join-otp"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { sendJSONToAPI } from "@/tools/apiHandler"
import { Progress } from "@/components/ui/progress"

export default function JoinSection(){
    const [value, setValue] = useState("")
    const [invalid, setInvalid] = useState(false)
    const [progress, setProgress] = useState(0)
    const router = useRouter()
    return (
        <div className="flex flex-col items-center space-y-2">
            <JoinOTP value={value} setValue={setValue}/>
            <Button
                variant={"outline"}
                disabled={value.length !== 6}
                className={value.length == 6? "border-black" : ""}
                onClick={async() => {
                    setProgress(20)
                    setInvalid(false)
                    const res = await sendJSONToAPI({
                        url: "/api/user/join",
                        method: "PATCH",
                        body: JSON.stringify({ data: value })
                    })
                    setProgress(100)
                    if(res?.message === "SUCCESS"){
                        router.push("/airlines")
                    } else {
                        setValue("")
                        setTimeout(() => {
                            setProgress(0)
                            setInvalid(true)
                        },200)
                    }
                }}
            > 
                Join
            </Button>
            <div className="flex flex-col items-center w-full h-16">
                {progress > 0 && <Progress value={progress}/>}
                {invalid && <span className="text-red-600 text-center font-bold">Invalid Code</span>}
            </div>
        </div>
    )
}