import LobbyWaitTable from "@/components/lobby/lobby-wait-table";
import LobbyNannyWaitTable from "@/components/lobby/lobby-nanny-table";
import LobbyNannySection from "@/components/lobby/lobby-nanny-section";

import NavBar from "@/components/navbar/nav-bar";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import prisma from "@/prisma-client";
import { AirlineRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
// enum AirlineRole {
//     Captain
//     Crew
//     Co_pilot //map to Co-pilot
//   }
export default async function Airline({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    redirect("/");
  }
  // if(session?.user.role !== "STAFF" && session?.user.role !== "ADMIN"){
  //     redirect("/status")
  //   }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: {
      airlineRole: true,
      airline: {
        select: {
          title: true,
        },
      },
    },
  });

  // if(user.airlineId == null){
  //     redirect("/join")
  // }
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <div className="w-11/12 my-4 md:w-1/2 flex flex-col rounded-lg shadow-lg bg-white">
        <h1 className="text-center font-extrabold text-3xl bg-gray-200 rounded-t-lg py-2">
          {`${user.airline?.title} Airline`}
        </h1>
        <LobbyNannySection session={session}/>
      </div>
    </main>
  );
}
// {user.airlineRole == AirlineRole.Co_pilot ||
//     session.user.role == "ADMIN" ? (
//       <>
//         {/* <LobbyNannyWaitTable session={session} /> */}
//         <ReadyButton />
//       </>
//     ) : (
//       <>
//         {/* <LobbyNannyWaitTable session={session} /> */}
//         <ReadyButton />
//       </>
//       //   <LobbyWaitTable session={session} />
//     )}
function ReadyButton() {
  return <Button className = "mt-8" disabled = {true}>Ready</Button>;
}
