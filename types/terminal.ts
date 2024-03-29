import type { AirlineClass, Color } from "@prisma/client";

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
  airline_id: number;
  airline_name: string;
  available_cost: number;
  initial_cost: number;
  player_id: number;
  is_playing: boolean;
}

export interface CasinoTableData extends CasinoSelectData {
  this_pot: number;
}
