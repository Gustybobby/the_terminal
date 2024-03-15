import { TerminalDrawer } from "@/components/terminal/terminal-drawer";
import { IoPerson } from "react-icons/io5";
import NavBar from "@/components/navbar/nav-bar";
import prisma from "@/prisma-client";

export default async function Terminal({ params }: { params: { id: string } }) {
  // query first
  const terminal = await prisma.terminal.findFirst({
    where: {
      id: +params.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      passengerRate: true,
      lastPassengerUpdate: true,

      capturedBy: {
        select: {
          id: true,
        },
      },
    },
  });

  // type Terminal = {
  //   name: string;
  //   details: string;
  //   passengers_rate: {
  //     passengers_num: number;
  //     interval_sec: number;
  //   };
  //   owner: string;
  // };
  // const terminal: Terminal = {
  //   name: "Chayen",
  //   details:
  //     "This game has this following rule that suggests the following thing.",
  //   passengers_rate: {
  //     passengers_num: 5,
  //     interval_sec: 5,
  //   },
  //   owner: "Airline 1",
  // };
  return (
    <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <NavBar child="terminals" />
      <div className="w-11/12 my-4 md:w-1/2 flex flex-col p-2 rounded-lg shadow-lg h-[80vh] bg-white">
        <h1 className="text-5xl font-extrabold text-left mt-8 mb-4">
          Terminal {terminal?.id}
        </h1>
        <div className="relative w-full flex flex-row items-center justify-between">
          <h2 className=" text-3xl font-bold mb-2">{terminal?.title}</h2>
          <div className=" text-3xl font-semibold mb-2 flex flex-row items-center">
            <div>{terminal?.passengerRate}</div>
            {/* <div>{terminal?.passengers_rate.passengers_num}</div>
            <IoPerson />
            <div> / {terminal.passengers_rate.interval_sec} s</div> */}
          </div>
        </div>
        <p className="text-l font-normal mb-4">{terminal?.description}</p>

        <div className="w-full flex flex-col justify-center items-center">
          <h2 className=" text-3xl font-bold mb-2">Terminal Owner</h2>
          <h3 className=" text-3xl font-semibold mb-2">
            Airline {terminal?.capturedBy?.id}
          </h3>
          <h4 className=" text-xl font-semibold mb-2">Airline Name</h4>
          <h2 className=" text-3xl font-bold mb-2">Last Flight Departure</h2>
          <h3 className=" text-3xl font-semibold mb-2">
            {terminal?.lastPassengerUpdate.getTime()}
          </h3>
          <TerminalDrawer terminalId={+params.id} />
        </div>
      </div>
    </main>
  );
}
