"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import CasinoSelectTable from "./casino-select-table";
import CasinoTable from "./casino-table";

import { CasinoSelectData, CasinoTableData } from "@/types/terminal";
import { sendJSONToAPI } from "@/tools/apiHandler";
export default function LobbyNannySection({
  airlines,
}: {
  airlines: { title: string; id: number, passengers : number }[];
}) {
  const [tableData, setTableData] = useState<CasinoSelectData[]>(
    initializeSelectTable({ airlines })
  );
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
  }, [tableData, casinoRunning, runningTableData]);

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
  }, [runningTableData, casinoRunning]);
  //   useEffect(() => {
  //     if(!correct) {
  //         setReady(false);}
  //   }, [correct]);

  const handleStart = async () => {
    setReady(!ready);
    setCasinoRunning(!casinoRunning);
    setRunningTableData(
      tableData
        .filter((a) => a.is_playing)
        .map((row) => ({ ...row, this_pot: 0 }))
    );

    tableData
      .filter((a) => a.is_playing)
      .map(async (row) => {
        const res = await sendJSONToAPI({
          url: "/api/casino",
          method: "POST",
          body: JSON.stringify({ data: {airline_id : row.airline_id,passengerAmount : -row.initial_cost} }),
        });

        console.log(res);
        // Do something with res if needed
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
    var filteredTable = runningTableData.filter((row) => row.initial_cost > 0);
    var maxPot = 0; 
    runningTableData.map((row) => (row.this_pot > maxPot ? maxPot = row.this_pot : maxPot = maxPot));
    var winningPot = 0;
    {(filteredTable.length >= 1) ? winningPot = maxPot : winningPot = filteredTable[0].this_pot}
    filteredTable.map(async (row) => {
      const res = await sendJSONToAPI({
        url: "/api/casino",
        method: "POST",
        body: JSON.stringify({ data: {airline_id : row.airline_id,passengerAmount : row.this_pot} }),
      });
    });
    
    console.log(winningPot);
    setRunningTableData([]);
    // setWonAirlineId(0);
  };
  return (
    <div className="flex flex-col ">
      {!casinoRunning ? (
        <>
          <CasinoSelectTable
            className={"mb-4"}
            tableData={tableData}
            setTableData={setTableData}
          />
        </>
      ) : (
        <>
          <CasinoTable
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

function initializeSelectTable({
  airlines,
}: {
  airlines: { title: string; id: number, passengers:number }[];
}) {
  const selectData: CasinoSelectData[] = [];
  for (const airline of airlines) {
    selectData.push({
      airline_id: airline.id,
      airline_name: airline.title,
      player_id: 0,
      initial_cost: 100,
      is_playing: false,
      available_cost: airline.passengers
    });
    // selectData.push({
    //   airline_id: airline.id,
    //   airline_name: airline.title,
    //   player_id: 1,
    //   initial_cost: 100,
    //   is_playing: false,
    // })
  }
  return selectData;
}
