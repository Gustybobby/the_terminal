import type { AirlineClass, AirlineRole, Effect } from "@prisma/client";

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
    unitTick: number;
    effects: Effect[];
}

export interface EffectData {
    applyBy: { title: string },
    applyTo: { title: string },
    to: Date,
}

export interface AirlineData {
    passengers: number;
    class: AirlineClass;
    crews: CrewTableData[];
    captures: CaptureData[];
    effects: EffectData[];
    stock: number;
    allAirlines: {
        id: number;
        title: string;
    }[];
}

export interface LobbyTableData{
    id: string
    airlineRole: AirlineRole
    name : string | null
}

export interface AirlineClassAuction {
    id: number
    title: string
    class: AirlineClass
}

export interface SelectAirline {
    id: number | null
    title: string
}