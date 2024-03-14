"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
export default function TerminalControlSection({id : {}}){
    const [value, setValue] = useState("")
    const router = useRouter()
    return (
        <div className="flex flex-col items-center space-y-2">
            <h1> : </h1>
                
            <div>Table</div>
        </div>
    )
}