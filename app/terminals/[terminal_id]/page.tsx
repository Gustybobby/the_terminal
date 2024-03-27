import NavBar from "@/components/navbar/nav-bar";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import TerminalStaffDetails from "@/components/terminals/terminal-staff-details";
import prisma from "@/prisma-client";

export default async function Terminal({ params }: { params: { terminal_id: string }}) {
  if(params.terminal_id === "11"){
    redirect("/casino")
  }
  const session = await getServerAuthSession()
  if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
    redirect("/status")
  }
  const airlines = await prisma.airline.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      id: "asc"
    }
  })
  return (
    <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <NavBar child="status"/>
      <div className="w-11/12 my-4 md:w-1/2 flex flex-col p-2 rounded-lg shadow-lg h-[80vh] bg-white">
        <TerminalStaffDetails terminalId={+params.terminal_id} airlines={airlines}/>
      </div>
    </main>
  );
}