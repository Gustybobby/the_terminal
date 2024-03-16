"use client"

import { useEffect } from "react"
import { useToast } from "../ui/use-toast"
import useCaptureRecords from "./useCaptureRecords"
import { FaFlag } from "react-icons/fa"

export default function useCaptureToast(){
    const { captureRecords } = useCaptureRecords({ refreshRate: 5000 })
    const { toast } = useToast()
    useEffect(() => {
        if(typeof captureRecords === "string"){
            return
        }
        for(const record of captureRecords){
            toast({
                description: (
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <FaFlag className="text-lg"/>
                            <span className="font-bold text-lg">{record.airline.title} captures {record.title}</span>
                        </div>
                        <span className="font-normal text-sm">{(new Date(record.capturedAt)).toLocaleString()}</span>
                    </div>
                ),
                duration: 3000,
            })
        }
    },[captureRecords, toast])

    return { captureRecords }
}