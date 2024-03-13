import { NextResponse } from "next/server";

export function GET(){
    const data = [
        {
            role: "Captain",
            name: "Napat Tatiyakaroonwong"
        },
        {
            role: "Engineer",
            name: "Napat Niamla-Ong"
        }
    ]
    return NextResponse.json({ data })
}