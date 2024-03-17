"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LobbyNannyTable from "./lobby-nanny-table";
import { sendJSONToAPI } from "@/tools/apiHandler";
import { useRouter } from "next/navigation";
import type { AirlineLobby } from "@/types/airline";

export default function LobbyNannySection({ airlineId, airlineLobby, refetch }: {
  airlineId: number
  airlineLobby: AirlineLobby
  refetch: Dispatch<SetStateAction<{}>>
}) {
  const router = useRouter()
  const [correct, setCorrect] = useState<boolean>(airlineLobby.crews.filter((a) => a.airlineRole === "Captain").length === 1);
  useEffect(() => {
    setCorrect(airlineLobby.crews.filter((a) => a.airlineRole === "Captain").length === 1);
  }, [airlineLobby]);

  if(airlineLobby.start && airlineLobby.ready){
    router.replace(`/airlines/${airlineId}`)
  }
  return (
    <div className="flex flex-col ">
      <LobbyNannyTable
        airlineId={airlineId}
        className={"mb-4"}
        tableData={airlineLobby.crews}
        refetch={refetch}
      />
      <Button
        className={`text-center mt-8 focus:shadow-outline rounded-t-none ${airlineLobby.ready? "bg-green-400 hover:bg-green-300" : !correct? "bg-red-600" : ""}`}
        disabled={!correct}
        onClick={async() => {
          await sendJSONToAPI({
            url: `/api/airlines/${airlineId}/lobby`,
            method: "POST",
            body: JSON.stringify({ data: { ready: !airlineLobby.ready }})
          })
          refetch({})
        }}
      >
        {`${!airlineLobby.ready ? (correct? "Click when ready" : "One captain only") : "Ready For Take Off"}`}
      </Button>
    </div>
  );
}
