"use client"

import type { Gain, Source } from "@/types/passenger"
import { IoPeopleCircleSharp } from "react-icons/io5"
import type { AirlineData, CaptureData } from "@/types/airline"
import type { Effect } from "@prisma/client"
import { FACTION_MAP } from "@/game/faction"

export default function Display({ airline, effects }: { airline: AirlineData, effects: Effect[] }){
    const total = totalGain(
        airline.captures.map((capture) => getTerminalGain(capture))
            .concat(effects.map((effect) => getEffectGain(effect, airline)))
    )
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl text-center font-bold mt-2">Class: {airline.class}</h2>
            <h2 className="text-2xl text-center font-bold mt-2">
                {airline.passengers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>
            <IoPeopleCircleSharp className="text-center text-5xl"/>
            <span className={textStyles.coloredText(total >= 0)+" font-semibold"}>
                ≈ {total.toFixed(2)} passengers / 5s
            </span>
            <ul className="w-full flex flex-col items-start text-sm mt-2 ml-8">
                {airline.captures.map((capture, index) => (
                    <PassengerGain
                        gain={getTerminalGain(capture)}
                        key={"TERMINAL_"+index}
                    />
                ))}
                {effects.map((effect, index) => (
                    <PassengerGain
                    gain={getEffectGain(effect, airline)}
                    key={"EFFECT_"+index}
                />
                ))}
            </ul>
        </div>
    )
}

function PassengerGain({ gain }: { gain: Gain }){
    return (
        <li className={textStyles.coloredText(gain.passengerRate >= 0)}>
            {gain.passengerRate < 0? "-" : "+"} {Math.abs(gain.passengerRate)} / {gain.unitTime}s from <SourceDisplay source={gain.source}/>
        </li>
    )
}

function SourceDisplay({ source }: { source: Gain["source"] }){
    switch(source.type){
        case "terminal":
            return <>{source.terminalTitle}</>
        case "effect":
            return <>{source.effectTitle}</>
        default:
            return <></>
    }
}

function totalGain(gains: Gain[]){
    let totalGain = 0
    for(const gain of gains){
        totalGain += gain.passengerRate/gain.unitTime*5
    }
    return totalGain
}

const textStyles = {
    coloredText: (nonNeg: boolean) => [
        nonNeg?  "text-green-600" : "text-red-600"
    ].join(" ")
}

function getTerminalGain(capture: CaptureData): Gain{
    const boost = capture.effects.find((fx) => fx.terminalId === capture.id)?.type === "MSME"
    return {
        source: {
            type: "terminal",
            terminalId: capture.id,
            terminalTitle: capture.title + (boost? " (Logistics Boost)" : ""),
        },
        passengerRate: capture.passengerRate,
        unitTime: capture.unitTime / (boost? 2: 1),
    }
}

function getEffectGain(effect: Effect, airline: AirlineData): Gain{
    const source: Source = {
        type: "effect",
        effectTitle: FACTION_MAP[effect.type].ability_name,
    }
    switch(effect.type){
        case "CET":
            const appliedTerminal: CaptureData | undefined = airline.captures.find((terminal) => terminal.id === effect.terminalId)
            return {
                source,
                passengerRate: (appliedTerminal?.passengerRate ?? 0) * 2,
                unitTime: appliedTerminal?.unitTime ?? 1
            }
        default:
            throw "unhandled"
    }
}