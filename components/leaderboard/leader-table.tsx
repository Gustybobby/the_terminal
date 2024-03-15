"use client"

import { FaMedal } from "react-icons/fa";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import useLeaderboard from "../hooks/useLeaderboard";
import AnimatedNumbers from "react-animated-numbers";

export default function LeaderTable(){
    const { leaderboard } = useLeaderboard({ refreshRate: 5000 })
    if(leaderboard === "loading"){
        return <></>
    }
    return (
        <Table className="bg-white">
            <TableHeader className="font-bold">
                <TableRow>
                    <TableHead className="w-1/4">Rank</TableHead>
                    <TableHead className="w-1/2">Airline</TableHead>
                    <TableHead className="w-1/4">Passenger</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leaderboard.map((row: any, index: number) => (
                <TableRow key={index}>
                    <TableCell className="flex items-center">
                        <FaMedal className={styles.medalColor(index)}/>{index+1}
                    </TableCell>
                    <TableCell className="font-medium">{row.title}</TableCell>
                    <TableCell className="font-bold">
                        <AnimatedNumbers
                            includeComma
                            transitions={() => ({
                                type: "spring",
                                duration: 0.2,
                            })}
                            animateToNumber={row.passengers}
                        />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const styles = {
    medalColor: (index: number) => [
        index == 0? "text-yellow-500" : "",
        index == 1? "text-gray-500" : "",
        index == 2? "text-amber-700" : "",
        index > 2? "text-white" : "",
        "mr-1",
    ].join(" ")
}