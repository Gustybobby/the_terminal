import SelectCasinoSection from "@/components/casino/casino-select-section";
import prisma from "@/prisma-client";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";

export default async function Casino() {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    redirect("/");
  }
  if (session?.user.role !== "STAFF" && session?.user.role !== "ADMIN") {
    redirect("/status");
  }
  const airlines = await prisma.airline.findMany({
    select: {
      id: true,
      title: true,
    }
  })
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
      <div className="w-11/12 my-4 md:w-1/2 flex flex-col rounded-lg shadow-lg bg-white">
        <h1 className="text-center font-extrabold text-3xl bg-gray-200 rounded-t-lg py-2">
          {`Welcome to the Casino`}
        </h1>
      </div>
      <SelectCasinoSection airlines={airlines}/>
    </main>
  );
}
