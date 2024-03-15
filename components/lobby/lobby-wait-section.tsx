"use client";

import { useRouter } from "next/navigation";
import useLobby from "../hooks/useLobby";
import { LoadingSpinner } from "../ui/loading-spinner";
import LobbyWaitTable from "./lobby-wait-table";

export default function LobbyWait({ airlineId }: { airlineId: number }) {
  const router = useRouter()
  const { airlineLobby } = useLobby({ airlineId, refreshRate: 5000 })
  if(airlineLobby === "loading"){
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner className="size-36"/>
      </div>
    )
  }
  if(airlineLobby.start && airlineLobby.ready){
    router.replace(`/airlines/${airlineId}`)
  }
  return (
    <div className="p-1">
      <h2 className="ml-4 font-bold text-2xl mb-2">Members</h2>
      <LobbyWaitTable
        tableData={airlineLobby.crews}
      />
    </div>
  );
}
