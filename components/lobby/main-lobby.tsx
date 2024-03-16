"use client"

import LobbyClassGroupSection from "./lobby-class-section"
import LobbyNannySection from "./lobby-nanny-section"
import LobbySecretDrawer from "./lobby-secret-drawer"
import LobbyWaitSection from "./lobby-wait-section"
import useLobby from "../hooks/useLobby"
import { LoadingSpinner } from "../ui/loading-spinner"

export default function MainLobby({ editable, airline, secret }: {
    airline: {
        id: number,
        title: string,
    }
    editable: boolean
    secret: string | null
}){
    const { airlineLobby, refetch } = useLobby({ airlineId: airline.id, refreshRate: 5000 })

    if(airlineLobby === "loading"){
        return (
            <div className="flex justify-center py-4">
                <LoadingSpinner className="size-36"/>
            </div>
        )
    }
    return (
        <>
            <div className="w-11/12 my-4 md:w-1/2 flex flex-col rounded-lg shadow-lg bg-white">
                <h1 className="text-center font-extrabold text-3xl bg-gray-200 rounded-t-lg py-2">
                    {`${airline.title} Airline`}
                </h1>
                {editable ? (
                    <LobbyNannySection
                        airlineId={airline.id}
                        airlineLobby={airlineLobby}
                        refetch={refetch}
                    />
                ) : (
                    <LobbyWaitSection
                        airlineId={airline.id}
                        airlineLobby={airlineLobby}
                    />
                )}
            </div>
            <div className="w-11/12 flex flex-col items-center">
                {secret &&
                <LobbySecretDrawer
                    className="mb-4 w-full font-normal py-2 rounded-lg bg-black hover:bg-black/80 transition-colors text-white"
                    flagSecret={secret}
                />
                }
                <LobbyClassGroupSection
                    editable={editable}
                    airlineClass={airlineLobby.class}
                    airlineId={airline.id}
                    refetch={refetch}
                />
            </div>
        </>
    )
}