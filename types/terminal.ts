import type { AirlineClass, Color, TerminalStatus } from "@prisma/client";

export interface CapturedByRecord {
  title: string;
  airline: {
    id: number;
    title: string;
  };
  capturedAt: Date;
}

export interface TerminalData {
  id: number;
  title: string;
  secret: string;
  status: TerminalStatus
  description: string;
  passengerRate: number;
  unitTick: number;
  lastUpdateTick: number;
  capturedBy: {
    id: number;
    title: string;
    color: Color;
  } | null;
}

export interface Faction {
    id: number
    name: string,
    duration: number,
    duration_factor: number,
    abbreviation: AirlineClass,
    ability_name: string,
    use: number,
    description : string,
    type:string
}

export interface CasinoSelectData {
  id: number;
  title: string;
  passengers: number;
}

export interface CasinoPlayData extends CasinoSelectData {
  pot: number;
  playing: boolean;
}
