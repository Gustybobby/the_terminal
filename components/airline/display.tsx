"use client"

import { Gain } from "@/types/passenger"
import { IoPeopleCircleSharp } from "react-icons/io5"
import { LoadingSpinner } from "../ui/loading-spinner"
import type { AirlineData, CaptureData } from "@/types/airline"
import dynamic from "next/dynamic"
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
    ssr: false,
});

export default function Display({ airline }: { airline: AirlineData | "loading" }){
    if(airline === "loading"){
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner className="size-24"/>
            </div>
        )
    }
    const total = totalGain(airline.captures)
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl text-center font-bold mt-2">
                <AnimatedNumbers
                    includeComma
                    transitions={() => ({
                        type: "spring",
                        duration: 0.2,
                    })}
                    animateToNumber={airline.passengers}
                />
            </h2>
            <IoPeopleCircleSharp className="text-center text-5xl"/>
            <span className={textStyles.coloredText(total >= 0)+" font-semibold"}>
                ≈ {total} passengers / 5s
            </span>
            <ul className="w-full flex flex-col items-start text-sm mt-2 ml-8">
                {airline.captures.map((capture, index) => (
                    <PassengerGain
                        gain={{
                            source: {
                                type: "terminal",
                                terminalId: capture.id,
                                terminalTitle: capture.title,
                            },
                            passengerRate: capture.passengerRate,
                            unitTime: capture.unitTime,
                        }}
                        key={index}
                    />
                ))}
            </ul>
        </div>
    )
}

export function PassengerGain({ gain }: { gain: Gain }){
    return (
        <li className={textStyles.coloredText(gain.passengerRate >= 0)}>
            {gain.passengerRate < 0? "-" : "+"} {Math.abs(gain.passengerRate)} / {gain.unitTime}s from <SourceDisplay source={gain.source}/>
        </li>
    )
}

export function SourceDisplay({ source }: { source: Gain["source"] }){
    switch(source.type){
        case "terminal":
            return <>{source.terminalTitle}</>
        case "effect":
            return <>{source.airlineTitle}&apos;s {source.effectTitle}</>
        default:
            return <></>
    }
}

export function totalGain(captures: CaptureData[]){
    let totalGain = 0
    for (const capture of captures){
        totalGain += capture.passengerRate/capture.unitTime*5
    }
    return totalGain
}

export const textStyles = {
    coloredText: (nonNeg: boolean) => [
        nonNeg?  "text-green-600" : "text-red-600"
    ].join(" ")
}