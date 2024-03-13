"use client"
import { GiPotionBall } from "react-icons/gi";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function SkillsSection(){
    return (
        <div className="p-4">
            <h2 className="font-bold text-2xl mb-2">Skills</h2>
            <div className="grid grid-cols-3">
                <Card className="size-24 flex flex-col items-center space-y-1">
                    <GiPotionBall className="text-5xl"/>
                    <Button variant={"outline"} className="bg-green-300 hover:bg-green-400">Use</Button>
                </Card>
                <Card className="size-24 flex flex-col items-center space-y-1">
                    <GiPotionBall className="text-5xl"/>
                    <Button variant={"outline"} className="bg-green-300 hover:bg-green-400">Use</Button>
                </Card>
                <Card className="size-24 flex flex-col items-center space-y-1">
                    <GiPotionBall className="text-5xl"/>
                    <Button variant={"outline"} className="bg-green-300 hover:bg-green-400">Use</Button>
                </Card>
            </div>
        </div>
    )
}