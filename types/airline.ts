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

export interface LobbyTableData{
    id: string
    airlineRole: AirlineRole
    name : string | null
}

export interface AirlineLobby {
    start: boolean;
    ready: boolean;
    crews: LobbyTableData[];
}