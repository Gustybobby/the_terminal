"use client"

import Image from "next/image"
import useRecieveEffects from "../hooks/useRecieveEffects"
import { LoadingSpinner } from "../ui/loading-spinner"
import { ReactElement, cloneElement, useEffect } from "react"
import { useToast } from "../ui/use-toast"
import { FaExplosion } from "react-icons/fa6";
import { TICKUNIT } from "@/modules/routine"

export default function EffectWrapper({ children, airlineId, className }: {
    children: ReactElement
    airlineId?: number
    className?: string
}){
    const { effects, id, currentTick } = useRecieveEffects({ airlineId, refreshRate: TICKUNIT })
    const { toast } = useToast()
    useEffect(() => {
        if(effects === "loading"){
            return
        }
        const labExplosion = effects.find((effect) => effect.type === "BCET")
        if(labExplosion){
            toast({
                description: (
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <FaExplosion className="text-lg"/>
                            <span className="font-bold text-lg">There was a lab explosion</span>
                        </div>
                        <span className="font-normal text-sm">{}</span>
                    </div>
                ),
                variant: "destructive",
                duration: 3000,
            })
        }
    }, [effects, toast])
    if(effects === "loading"){
        return (
          <div className="w-full h-full flex justify-center items-center">
              <LoadingSpinner className="size-24"/>
          </div>
        )
      }
    const isDisabled = !!effects.find((effect) => effect.type === "ICT" && effect.applyToId === id)
    const renderChildren = () => {
        return cloneElement(children, { effects: effects.filter((effect) => effect.type !== "BCET"), currentTick })
    }
    return (
        <div className={className}>
            {isDisabled?
            <>
                <Image
                    className="absolute w-full h-screen top-0 left-0 overflow-hidden z-20"
                    src="/rsc/hitmeup.gif"
                    alt="hitmeup"
                    unoptimized
                    width={200}
                    height={200}
                    quality={20}
                />
                <div className="z-30 font-bold text-red-500 text-5xl text-center">
                    YOU HAVE BEEN HACKED
                </div>
            </>
            :
            <>{renderChildren()}</>
            }
        </div>
    )
}