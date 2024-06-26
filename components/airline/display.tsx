"use client"

import type { Gain, Source } from "@/types/passenger"
import { IoPeopleCircleSharp } from "react-icons/io5"
import type { AirlineData, CaptureData } from "@/types/airline"
import type { Effect } from "@prisma/client"
import { FACTION_MAP } from "@/game/faction"
import { TICKUNIT } from "@/modules/routine"

export default function Display({ airline, effects }: { airline: AirlineData, effects: Effect[] }){
    const total = totalGain(
        airline.captures.map((capture) => getTerminalGain(capture, effects))
            .concat(effects.map((fx) => getEffectGain(fx, airline)).filter((fx) => fx !== null) as Gain[])
    )
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl text-center font-bold mt-2">Class: {airline.class}</h2>
            <h2 className="text-2xl text-center font-bold mt-2">
                {airline.passengers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>
            <IoPeopleCircleSharp className="text-center text-5xl"/>
            <span className={textStyles.coloredText(total >= 0)+" font-semibold"}>
                ≈ {total.toFixed(2)} passengers / 2s
            </span>
            <ul className="w-full flex flex-col items-start text-sm mt-2 ml-8">
                {airline.captures.map((capture, index) => (
                    <PassengerGain
                        gain={getTerminalGain(capture, effects)}
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

function PassengerGain({ gain }: { gain: Gain | null }){
    if(!gain){
        return <></>
    }
    if(gain.passengerRate === "unknown"){
        return (
            <li className={textStyles.coloredText(true)}>
                + ?? / ??s from <SourceDisplay source={gain.source}/>
            </li>
        )
    }
    return (
        <li className={textStyles.coloredText(gain.passengerRate >= 0)}>
            {gain.passengerRate < 0? "-" : "+"} {Math.abs(gain.passengerRate)} / {gain.unitTick*TICKUNIT/1000}s from <SourceDisplay source={gain.source}/>
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
        if(gain.passengerRate === "unknown"){
            continue
        }
        totalGain += gain.passengerRate/gain.unitTick
    }
    return totalGain
}

const textStyles = {
    coloredText: (nonNeg: boolean) => [
        nonNeg?  "text-green-600" : "text-red-600"
    ].join(" ")
}

function getTerminalGain(capture: CaptureData, effects: Effect[]): Gain{
    const boost = !!effects.find((fx) => fx.type === "MSME")
    const terminalEffects = capture.effects.filter((fx) => fx.terminalId === capture.id)
    const decision = !!terminalEffects.find((fx) => fx.type === "MT")
    const foundation = !!terminalEffects.find((fx) => fx.type === "CET")
    const explosion = !!terminalEffects.find((fx) => fx.type == "BCET")
    let passengerRate = capture.passengerRate
    for(const fx of terminalEffects){
        passengerRate = Math.floor((fx.multiplier ?? 1)*(( fx.flatRate ?? 0 ) + passengerRate))
    }
    return {
        source: {
            type: "terminal",
            terminalId: capture.id,
            terminalTitle: capture.title + 
                (boost? " (Logistics Boost)" : "") +
                (decision? " (Decision Making)" : "") +
                (foundation? " (Foundation Matters)" : "") +
                (explosion? " (Exploded)" : ""),
        },
        passengerRate,
        unitTick: Math.round(capture.unitTick / (boost? 4 : 1)),
    }
}

function getEffectGain(effect: Effect, airline: AirlineData): Gain | null{
    const source: Source = {
        type: "effect",
        effectTitle: FACTION_MAP[effect.type].ability_name,
    }
    switch(effect.type){
        case "ICT":
            return {
                source,
                passengerRate: "unknown",
                unitTick: 1
            }
        case "CET":
        case "MSME":
        case "MT":
        case "BCET":
            return null
        default:
            throw "unhandled"
    }
}