import type { AirlineClass } from "@prisma/client";

export interface AdminGameState {
    id: string;
    start: boolean;
    pause: boolean;
    clock: Date;
    lastPause: Date | null;
    lastResume: Date | null;
}

export interface AdminAirline {
    id: number;
    title: string;
    airlineSecret: string;
    passengers: number;
    class: AirlineClass;
    ready: boolean;
}

export interface AdminData {
    gameState: AdminGameState
    airlines: AdminAirline[]
}