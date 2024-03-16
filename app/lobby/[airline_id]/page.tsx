import LobbyWaitSection from "@/components/lobby/lobby-wait-section";
import LobbyNannySection from "@/components/lobby/lobby-nanny-section";
import LobbyClassGroupSection from "@/components/lobby/lobby-class-section";

import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import prisma from "@/prisma-client";
import { AirlineRole } from "@prisma/client";

export default async function Airline({
  params,
}: {
  params: { airline_id: string };
}) {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    redirect("/");
  }
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
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <div className="w-11/12 my-4 md:w-1/2 flex flex-col rounded-lg shadow-lg bg-white">
        <h1 className="text-center font-extrabold text-3xl bg-gray-200 rounded-t-lg py-2">
          {`${user.airline?.title} Airline`}
        </h1>
        {user.airlineRole == AirlineRole.Co_pilot ||
        session.user.role == "ADMIN" ? (
          <LobbyNannySection airlineId={+params.airline_id} />
        ) : (
          <LobbyWaitSection airlineId={+params.airline_id} />
        )}
      </div>
      <div className="w-11/12 flex flex-col items-center">
        <LobbyClassGroupSection airlineRole={user.airlineRole} />
      </div>
    </main>
  );
}
