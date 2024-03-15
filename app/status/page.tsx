import NavBar from "@/components/navbar/nav-bar";
import prisma from "@/prisma-client";

import type { UserTerminalData } from "@/types/terminal"

import StatusCardGroup from "@/components/status/status-card-group";
export default async function TerminalStatusPage() {


  const terminals = await prisma.terminal.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      passengerRate: true,
      unitTime: true,
      lastPassengerUpdate: true,
      capturedBy: {
        select: {
          id: true,
          title: true
        },
      },
    },
  }) as UserTerminalData[];
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <NavBar child="status" />
      <div className="w-full px-4 h-fit flex flex-col m-2">
        <h1 className="font-light ">Click Card to View Details</h1>
        <StatusCardGroup terminals = {terminals} />
      </div>
    </main>
  );
}
