import { Gain } from "@/types/passenger"
import { useEffect, useState } from "react"
import { IoPeopleCircleSharp } from "react-icons/io5"

const gains: Gain[] = [
    {
        passengerRate: 100,
        unitTime: 10,
        source: {
            type: "terminal",
            terminalTitle: "Chayen",
            terminalId: 1,
        }
    },
    {
        passengerRate: -2000,
        unitTime: 100,
        source: {
            type: "effect",
            airlineId: 1,
            airlineTitle: "SIIT",
            effectId: 1,
            effectTitle: "Explosive"
        }
    }
]

export default function Display(){

    const [passenger, setPassenger] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => count+5)
        }, 5000)
        return () => clearInterval(interval)
    },[])

    useEffect(() => {
        let totalAdd = 0
        if(count == 0){
            return
        }
        for(const gain of gains){
            if (count % gain.unitTime == 0){
                totalAdd += gain.passengerRate
            }
        }
        setPassenger(passenger => passenger + totalAdd)
    }, [count])

    const total = totalGain({ gains })
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl text-center font-bold">
                {passenger}
            </h2>
            <IoPeopleCircleSharp className="text-center text-5xl"/>
            <span className={textStyles.coloredText(total >= 0)+" font-semibold"}>
                ≈ {total} passengers / 5s
            </span>
            <ul className="w-full flex flex-col items-start text-sm mt-2 ml-8">
                {gains.map((gain, index) => (
                    <PassengerGain gain={gain} key={index}/>
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

export function totalGain({ gains }: { gains: Gain[] }){
    let totalGain = 0
    for (const gain of gains){
        totalGain += gain.passengerRate/gain.unitTime*5
    }
    return totalGain
}

export const textStyles = {
    coloredText: (nonNeg: boolean) => [
        nonNeg?  "text-green-600" : "text-red-600"
    ].join(" ")
}