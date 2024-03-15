"use client"

import { sendJSONToAPI } from "@/tools/apiHandler"
import useAdmin from "../hooks/useAdmin"
import { Button } from "../ui/button"
import { LoadingSpinner } from "../ui/loading-spinner"

export default function Dashboard(){
    const { admin, refetch } = useAdmin({ refreshRate: 5000 })
    if(admin === "loading"){
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingSpinner className="size-40"/>
            </div>
        )
    }
    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-3 p-4 gap-2">
            <div className="h-full border border-black shadow-lg rounded-lg p-2 flex flex-col items-center">
                <div className="w-full h-fit p-2 grid grid-cols-3 gap-1 items-center rounded-lg shadow-lg">
                    <h1 className="font-bold text-xl">Time Control</h1>
                    <Button
                        variant={"default"}
                        disabled={admin.pause}
                        onClick={async() => {
                            await sendJSONToAPI({
                                url: "/api/admin/pause",
                                method: "POST",
                                body: JSON.stringify({ data: true })
                            })
                            refetch({})
                        }}
                    >
                        Pause
                    </Button>
                    <Button
                        variant={"default"}
                        disabled={!admin.pause}
                        onClick={async() => {
                            await sendJSONToAPI({
                                url: "/api/admin/pause",
                                method: "POST",
                                body: JSON.stringify({ data: false })
                            })
                            refetch({})
                        }}
                    >
                        Resume
                    </Button>
                    <h2 className="col-span-3">Last Pause: {(new Date(admin.lastPause)).toLocaleString()}</h2>
                    <h2 className="col-span-3">Last Resume: {(new Date(admin.lastResume)).toLocaleString()}</h2>
                </div>
            </div>
            <div className="h-full border border-black shadow-lg rounded-lg">

            </div>
            <div className="h-full border border-black shadow-lg rounded-lg">

            </div>
        </div>
    )
}