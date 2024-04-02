"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CasinoSelectTable from "./casino-select-table";
import CasinoTable from "./casino-table";
import useCasino from "../hooks/useCasino";
import { TICKUNIT } from "@/modules/routine";
import { LoadingSpinner } from "../ui/loading-spinner";
import { sendJSONToAPI } from "@/tools/apiHandler";

export default function CasinoSelectSection(){
	const [playing, setPlaying] = useState(false)
	const { airlines, selectData, setSelectData } = useCasino({ refreshRate: TICKUNIT })

	if(typeof airlines === "string" || selectData === "loading"){
		return (
            <div className="w-full flex justify-center items-center">
                <LoadingSpinner className="size-40"/>
            </div>
        )
	}
	const illegalPot = !!selectData.filter((data) => data.playing).find((data) => data.pot > data.passengers || data.pot < 100)
	return (
		<div className="flex flex-col">
			{!playing?
			<CasinoSelectTable
				className={"mb-4"}
				tableData={selectData}
				setTableData={setSelectData}
			/>
			:
			<CasinoTable
				className={"mb-4"}
				tableData={selectData.filter((data) => data.playing)}
				setTableData={setSelectData}
			/>
			}
			<div className="m-2 flex flex-col items-center">
				<Button
					className={`w-full text-center mt-8 focus:shadow-outline disabled:opacity-75 ${(illegalPot && !playing)? "bg-red-500" : ""}`}
					onClick={async(e) => {
						const button = e.target as HTMLButtonElement
						button.disabled = true
						setPlaying(true)
						selectData.filter((data) => data.playing).forEach(async(row) => {
							await sendJSONToAPI({
								url: "/api/casino",
								method: "POST",
								body: JSON.stringify({ data: { airline_id: row.id, passengerAmount: -row.pot }})
							})
						})
						button.disabled = false
					}}
					disabled={playing || selectData.filter((data) => data.playing).length < 2 || illegalPot}
				>
					{playing? "Playing Casino" : (illegalPot? "Illegal Pot" : "Start Casino Session")}
				</Button>
				<Button
					className="w-full text-center mt-2 focus:shadow-outline disabled:opacity-75"
					onClick={() => {
						setSelectData("loading")
						setPlaying(false)
					}}
					disabled={!playing}
				>
					End Casino Session
				</Button>
			</div>
		</div>
	)
}
