import type { AirlineRole } from "@prisma/client";

export interface LeaderboardData {
    title: string
    passengers: number
}

export interface CrewTableData {
    name: string | null;
    airlineRole: AirlineRole;
}

export interface CaptureData {
    id: number
    title: string,
    passengerRate: number;
    unitTime: number;
}

export interface AirlineData {
    passengers: number;
    crews: CrewTableData[];
    captures: CaptureData[];
}

