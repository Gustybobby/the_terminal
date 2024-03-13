import { NextResponse } from "next/server";

export function GET(){
    const data = [
        {
            role: "Captain",
            name: "Napat Tatiyakaroonwong"
        },
        {
            role: "Engineer",
            name: "Napat Niam-La-Ong"
        }
    ]
    return NextResponse.json({ data })
}