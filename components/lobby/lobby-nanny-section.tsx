"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LobbyNannyTable from "./lobby-nanny-table";
import useLobby from "../hooks/useLobby";
import { sendJSONToAPI } from "@/tools/apiHandler";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useRouter } from "next/navigation";

export default function LobbyNannySection({ airlineId }: { airlineId: number }) {
  const router = useRouter()
  const { airlineLobby, refetch } = useLobby({ airlineId, refreshRate: 5000 })
  const [correct, setCorrect] = useState<boolean>(
    airlineLobby !== "loading" && airlineLobby.crews.filter((a) => a.airlineRole === "Captain").length === 1
  );
  useEffect(() => {
    setCorrect(airlineLobby !== "loading" && airlineLobby.crews.filter((a) => a.airlineRole === "Captain").length === 1);
  }, [airlineLobby]);

  if(airlineLobby === "loading"){
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner className="size-36"/>
      </div>
    )
  }
  // if(airlineLobby.start && airlineLobby.ready){
  //   router.replace(`/airlines/${airlineId}`)
  // }
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
