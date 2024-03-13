import NavBar from "@/components/navbar/nav-bar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaMedal } from "react-icons/fa";

export default async function LeaderboardPage(){
    const tableData: any = [{ title: "SINNO", passengers: "30M" },{ title: "Project A", passengers: "15M" },{ title: "SIIT", passengers: "10M" },{ title: "Random Ass", passengers: "3M" }]
    return (
        <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
            <NavBar child="leaderboard"/>
            <div className="w-11/12 my-4 md:w-1/2 flex flex-col p-2 rounded-lg shadow-lg h-[80vh] bg-white">
                <Table className="bg-white">
                    <TableHeader className="font-bold">
                        <TableRow>
                            <TableHead className="w-1/4">Rank</TableHead>
                            <TableHead className="w-1/2">Airline</TableHead>
                            <TableHead className="w-1/4">Passenger</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="flex items-center">
                                <FaMedal className={styles.medalColor(index)}/>{index+1}
                            </TableCell>
                            <TableCell className="font-medium">{row.title}</TableCell>
                            <TableCell className="font-bold">{row.passengers}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
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