import TerminalControlSection from "@/components/terminal/terminal-control-section";
import { IoPerson } from "react-icons/io5";

export default function Terminal({ params }: { params: { id: string } }) {
  // query first
  type Terminal = {
    name: string;
    details: string;
    passengers_rate: {
      passengers_num: number;
      interval_sec: number;
    };
  };
  const terminal: Terminal = {
    name: "Chayen",
    details:
      "This game has this following rule that suggests the following thing.",
    passengers_rate: {
      passengers_num: 5,
      interval_sec: 5,
    },
  };
  return (
    <main className="text-black h-screen w-full flex flex-col px-4">
      <h1 className="text-5xl font-extrabold text-left mt-8 mb-4">
        Terminal {params.id}
      </h1>
      <div className = "relative w-full flex flex-row items-center justify-between">
        <h2 className=" text-3xl font-bold mb-2">{terminal.name}</h2>
        <div className=" text-3xl font-semibold mb-2 flex flex-row items-center">
          <div>{terminal.passengers_rate.passengers_num}</div>
          <IoPerson />
          <div> / {terminal.passengers_rate.interval_sec} s</div>
        </div>
      </div>
      <p className="text-l font-normal mb-4">{terminal.details}</p>

      <div className="w-full flex flex-col justify-center items-center">
        <h2 className=" text-3xl font-bold mb-2">Current Team</h2>
        <h3 className=" text-3xl font-semibold mb-2">Team 1</h3>
        {/* <TerminalControlSection /> */}
      </div>
    </main>
  );
}
