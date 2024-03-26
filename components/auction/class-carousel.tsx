"use client"

import { FACTIONS } from "@/game/faction"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import ClassSelector from "./class-selector"
import useAirlineAuctions from "../hooks/useAirlineAuctions"
import { LoadingSpinner } from "../ui/loading-spinner"

export default function ClassCarousel(){
    const { airlines, refetch } = useAirlineAuctions({ refreshRate: 3600000 })
    if(typeof airlines === "string"){
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner className="size-24"/>
            </div>
          )
    }
    return (
        <Carousel className="w-1/3">
            <CarouselContent>
                {FACTIONS.concat(FACTIONS).map((faction, index) => (
                <CarouselItem key={index}>
                    <Card className="aspect-square flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-3xl">
                                {faction.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-start mx-4 p-2">
                            <CardDescription className="text-black text-2xl font-bold mb-2">
                                {faction.ability_name}
                            </CardDescription>
                            <CardDescription className="text-black text-xl font-semibold mb-2">
                                Use: {faction.abbreviation === "CET"? "Passive" : `${faction.use} per phase`}
                            </CardDescription>
                            <CardDescription className="text-black text-lg">
                                {faction.description.split("\n").map((line,j) => (
                                <div className={`mb-1 ${line.includes("***")? "text-red-600 font-semibold" : ""}`} key={j}>
                                    {line}
                                </div>
                                ))}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="w-full h-36 flex justify-center items-center">
                            <ClassSelector
                                airlines={airlines.filter((airline) => airline.class === "None" || airline.class === faction.abbreviation)}
                                airlineClass={faction.abbreviation}
                                index={index}
                                refetch={refetch}
                            />
                        </CardFooter>
                    </Card>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    )
}