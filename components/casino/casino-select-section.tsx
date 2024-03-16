"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Session } from "next-auth";
import CasinoSelectTable from "./casino-select-table";
import CasinoTable from "./casino-table";

import { CasinoSelectData, CasinoTableData } from "@/types/terminal";
export default function LobbyNannySection({ session }: { session: Session }) {
  // useEffect(() => {
  //     fetch("/api/airline/lobby")
  //         .then(res => res.json())
  //         .then(data => setTableData(data.data))

  //     const interval = setInterval(() => {
  //         fetch("/api/airline/lobby")
  //             .then(res => res.json())
  //             .then(data => setTableData(data.data))
  //     }, 5000)
  //     return () => clearInterval(interval)
  // },[])

  //   id : number
  //   airline_id : number
  //   airline_name : string
  //   initial_cost : number
  //   player_id : number
  //   is_playing : boolean
  const [tableData, setTableData] = useState<CasinoSelectData[]>([
    {
      id: 1,
      airline_id: 1,
      airline_name: "Airline 1",
      initial_cost: 100,
      player_id: 0,
      is_playing: false,
    },
    {
      id: 2,
      airline_id: 1,
      airline_name: "Airline 1",
      initial_cost: 100,
      player_id: 1,
      is_playing: false,
    },
    {
      id: 3,
      airline_id: 2,
      airline_name: "Airline 2",
      initial_cost: 100,
      player_id: 2,
      is_playing: false,
    },
    {
      id: 4,
      airline_id: 2,
      airline_name: "Airline 2",
      initial_cost: 100,
      player_id: 3,
      is_playing: false,
    },
    {
      id: 5,
      airline_id: 3,
      airline_name: "Airline 3",
      initial_cost: 100,
      player_id: 4,
      is_playing: false,
    },
    {
      id: 6,
      airline_id: 3,
      airline_name: "Airline 3",
      initial_cost: 100,
      player_id: 5,
      is_playing: false,
    },
    {
      id: 7,
      airline_id: 4,
      airline_name: "Airline 4",
      initial_cost: 100,
      player_id: 6,
      is_playing: false,
    },
    {
      id: 8,
      airline_id: 4,
      airline_name: "Airline 4",
      initial_cost: 100,
      player_id: 7,
      is_playing: false,
    },
  ]);

  const [runningTableData, setRunningTableData] = useState<CasinoTableData[]>(
    []
  );
  const [playable, setPlayable] = useState<boolean>(
    tableData.filter((a) => a.is_playing).length <= 4
  );
  const [casinoRunning, setCasinoRunning] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setPlayable(tableData.filter((a) => a.is_playing).length <= 4);
  }, [tableData]);

  //   useEffect(() => {
  //     if(!correct) {
  //         setReady(false);}
  //   }, [correct]);

  const handleClick = () => {
    setReady(!ready);
    setCasinoRunning(!casinoRunning);
    setRunningTableData(() => {
        const playingTableData = tableData.filter((a) => a.is_playing);
        const newTableData = playingTableData.map((row, i) => {
            const { ["is_playing"] : propToRemove,...rest} = row;
            return rest;
          });
      return newTableData;
    });
  };
  return (
    <div className="flex flex-col ">
      {!casinoRunning ? (
        <CasinoSelectTable
          session={session}
          className={"mb-4"}
          tableData={tableData}
          setTableData={setTableData}
        />
      ) : (
        <CasinoTable
          session={session}
          className={"mb-4"}
          tableData={runningTableData}
          setTableData={setRunningTableData}
        />
      )}

      <Button
        className={`text-center mt-8 focus:shadow-outline `}
        disabled={!playable}
        onClick={handleClick}
      >
        {`${!ready ? "Start Casino Session" : "Running"}`}
      </Button>
      <Button
        className={`text-center mt-8 focus:shadow-outline `}
        disabled={!playable}
        onClick={handleClick}
      >
        {`Stop Casino Session`}
      </Button>
    </div>
  );
}
