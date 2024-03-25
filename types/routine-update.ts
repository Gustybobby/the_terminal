import type { AirlineClass } from "@prisma/client";

export interface TerminalUpdateData {
    id: number;
    passengerRate: number;
    unitTick: number;
    lastUpdateTick: number;
    capturedByRecords: {
        id: number;
        capturedAt: Date;
        capturedTick: number;
        terminalId: number;
        airlineId: number;
    }[];
    capturedBy: {
        id: number;
        passengers: number;
        class: AirlineClass;
    };
}

export interface TerminalGainRoutineData {
    gain: number
    airlineId: number
    terminalId: number
    tickUpdated: boolean
}

export interface AirlineGainData {
    terminals: {
        [id: string]: TerminalGainRoutineData
    }
}