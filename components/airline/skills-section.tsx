"use client"
import { GiPotionBall } from "react-icons/gi";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import type { AirlineData } from "@/types/airline";
import { classEffect } from "@/game/effect";

export default function SkillsSection({ airline }: { airline: AirlineData }){
    return (
        <div className="p-4">
            <h2 className="font-bold text-2xl mb-2">Skills</h2>
            <div className="grid grid-cols-2">
                {Array(airline.stock).fill(0).map((_, index) => (
                    <Card className="py-2 flex flex-col items-center space-y-1" key={index}>
                        <GiPotionBall className="text-5xl"/>
                        <h1 className="font-bold">{classEffect[airline.class as keyof typeof classEffect].title}</h1>
                        <Button variant={"outline"} className="bg-green-300 hover:bg-green-400" disabled={true}>Use</Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}