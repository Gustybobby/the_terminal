import LobbyWaitSection from "@/components/lobby/lobby-wait-section";
import LobbyNannySection from "@/components/lobby/lobby-nanny-section";
import LobbyClassGroupSection from "@/components/lobby/lobby-class-section";


import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import prisma from "@/prisma-client";
import { AirlineRole } from "@prisma/client";

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
        {user.airlineRole == AirlineRole.Co_pilot ||
        session.user.role == "ADMIN" ? (
          <LobbyNannySection session={session} />
        ) : (
          <LobbyWaitSection session={session} />
        )}
      </div>
      <LobbyClassGroupSection/>
    </main>
  );
}
