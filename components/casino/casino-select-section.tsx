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
  const [totalPot, setTotalPot] = useState<number>(0);
  const [wonAirlineId, setWonAirlineId] = useState<number>(0);

  useEffect(() => {
    setPlayable(tableData.filter((a) => a.is_playing).length <= 4);
    if (casinoRunning) {
      var temp = 0;
      runningTableData.map((row) => {
        temp = temp + row.this_pot;
      });
      setTotalPot(temp);
    }
  }, [tableData]);

  useEffect(() => {
    if (casinoRunning) {
      var temp = 0;
      runningTableData.map((row) => {
        temp = temp + row.this_pot;
      });
      setTotalPot(temp);
    //   if (checkWinner(runningTableData))
    //     setWonAirlineId(
    //       runningTableData.filter((row) => row.initial_cost > 0)[0].airline_id
    //     );
    }
  }, [runningTableData]);
  //   useEffect(() => {
  //     if(!correct) {
  //         setReady(false);}
  //   }, [correct]);

  const handleStart = () => {
    setReady(!ready);
    setCasinoRunning(!casinoRunning);
    setRunningTableData(() => {
      const playingTableData = tableData.filter((a) => a.is_playing);
      const newTableData = playingTableData.map((row, i) => {
        const { ["is_playing"]: propToRemove, ...rest } = row;
        return { ...rest, ["this_pot"]: 0 };
      });
      return newTableData;
    });

    // API update passengers at the start.
  };

  const handleReset = () => {
    setReady(false);
    setCasinoRunning(false);
    setRunningTableData([]);
    setTableData(() => {
      const newTableData = tableData.map((row, i) => {
        row.is_playing = false;
        row.initial_cost = 100;
        return row;
      });
      return newTableData;
    });
  };

  const handleEnd = () => {
    // Look through to find the people with passengers left
    setReady(false);
    setCasinoRunning(false);

    // API update passengers at the end.
    // const filteredTable = tableData.filter((row) => row.initial_cost > 0);
    // var winningPot = 0;
    // filteredTable.map((row) => {
    //   winningPot += row.initial_cost;
    // });
    // console.log(winningPot);
    setRunningTableData([]);
    // setWonAirlineId(0);
  };
  return (
    <div className="flex flex-col ">
      {!casinoRunning ? (
        <>
          <CasinoSelectTable
            session={session}
            className={"mb-4"}
            tableData={tableData}
            setTableData={setTableData}
          />
        </>
      ) : (
        <>
          <CasinoTable
            session={session}
            className={"mb-4"}
            tableData={runningTableData}
            setTableData={setRunningTableData}
            currentPot={totalPot}
          />
          <div className="flex flex-col font-bold text-xl items-center">
            <div>This Pot</div>
            <div>{totalPot}</div>
            {wonAirlineId !== 0 ?? (
              <div>
                <div>The Winner</div>
                <div>{totalPot}</div>
              </div>
            )}
          </div>
        </>
      )}

      <Button
        className={`text-center mt-8 focus:shadow-outline disabled:opacity-75`}
        disabled={!playable || casinoRunning}
        onClick={handleStart}
      >
        {`${!ready ? "Start Casino Session" : "Running"}`}
      </Button>
      <Button
        className={`text-center mt-2 focus:shadow-outline disabled:opacity-75  `}
        disabled={!casinoRunning}
        onClick={handleEnd}
      >
        {`End Casino Session`}
      </Button>
      <Button
        className={`text-center mt-2 focus:shadow-outline disabled:opacity-75  `}
        disabled={!playable}
        onClick={handleReset}
      >
        {`Reset Casino Session`}
      </Button>
    </div>
  );
}

function checkWinner(tableData: CasinoTableData[]) {
  const filteredTable = tableData.filter((row) => row.initial_cost > 0);
  const airline_id = filteredTable[0].airline_id;
  return filteredTable.every((row) => row.airline_id == airline_id);
}
