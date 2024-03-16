"use client"

import Image from "next/image"
import useRecieveEffects from "../hooks/useRecieveEffects"
import { LoadingSpinner } from "../ui/loading-spinner"

export default function EffectWrapper({ children, className }: {
    children: React.ReactNode
    className?: string
}){
    const { effects } = useRecieveEffects({ refreshRate: 5000 })
    if(effects === "loading"){
        return (
          <div className="w-full h-full flex justify-center items-center">
              <LoadingSpinner className="size-24"/>
          </div>
        )
      }
    const isDisabled = !!effects.find((effect) => effect.type === "ICT")
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
            <>{children}</>
            }
        </div>
    )
}