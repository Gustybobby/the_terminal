import NavBar from "@/components/navbar/nav-bar";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import TerminalStaffDetails from "@/components/terminal/terminal-staff-details";

export default async function Terminal({ params }: { params: { terminal_id: string }}) {
  const session = await getServerAuthSession()
  if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
    redirect("/status")
  }
  return (
    <main className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <NavBar child="status"/>
      <div className="w-11/12 my-4 md:w-1/2 flex flex-col p-2 rounded-lg shadow-lg h-[80vh] bg-white">
        <TerminalStaffDetails terminalId={+params.terminal_id}/>
      </div>
    </main>
  );
}
<span className="text-center font-bold text-2xl p-4">You are not assigned to any Terminal</span>