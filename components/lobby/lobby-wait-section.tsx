"use client";

import { useRouter } from "next/navigation";
import LobbyWaitTable from "./lobby-wait-table";
import { AirlineLobby } from "@/types/airline";

export default function LobbyWaitSection({ airlineId, airlineLobby }: {
  airlineId: number
  airlineLobby: AirlineLobby
}) {
  const router = useRouter()
  
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
