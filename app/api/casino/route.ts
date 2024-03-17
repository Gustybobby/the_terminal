import prisma from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "../auth/[...nextauth]/_utils";

// export const dynamic = "force-dynamic"

interface updateType {
  airline_id: string;
  passengerAmount: string;
}
export async function POST(
  req: NextRequest,
  { params }: { params: { airline_id: string; passengerAmount: string } }
) {
  const request = await req.json();
  const data = request.data as updateType;
  console.log(data);
  console.log(data.airline_id);
  console.log(data.passengerAmount);

  const session = await getServerAuthSession();
  if (!session?.user.id) {
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }
  const passengerAmountInt = parseInt(data.passengerAmount);
  const airlineIdInt = parseInt(data.airline_id);
  const airline = await prisma.airline.findUniqueOrThrow({
    where: {
      id: airlineIdInt,
    },
    select: {
      passengers: true,
    },
  });
  if (!airline) {
    return NextResponse.json({ message: "ERROR" }, { status: 400 });
  }

  const updateAirline = await prisma.airline.update({
    where: {
      id: airlineIdInt,
    },
    data: {
      passengers: airline.passengers + passengerAmountInt,
    },
  });

  console.log("prev passengers is", airline.passengers);
  console.log("increment by", passengerAmountInt);
  console.log("new passengers is", updateAirline.passengers);
  return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
}
