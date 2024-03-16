import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";
import prisma from "@/prisma-client";
import MainLobby from "@/components/lobby/main-lobby";

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
      airlineId: session.user.role === "ADMIN"? undefined : +params.airline_id,
    },
    select: {
      airlineRole: true,
      airline: {
        select: {
          title: true,
          airlineSecret: true,
          class: true,
        },
      },
    },
  });
  if(!user.airline){
    redirect("/join")
  }
  const secret = user.airlineRole === "Co_pilot"? user.airline.airlineSecret : null
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <MainLobby
        editable={user.airlineRole === "Co_pilot"}
        secret={secret}
        airline={{
          id: +params.airline_id,
          title: session.user.role === "ADMIN"? `Airline ${params.airline_id}` : user.airline.title,
        }}
      />
    </main>
  );
}
