export interface UserTerminalData {
    id: number;
    title: string;
    description: string;
    passengerRate: number;
    unitTime: number;
    lastPassengerUpdate: Date;
    capturedBy: {
        id: number;
        title: string;
    } | null;
    capturedByRecords: {
        airline: {
            id: number;
            title: string;
        };
        capturedAt: Date,
    }[];
}

export interface Faction {
    id:number
   name : string,
   ability_name : string,
   use : number,
   description : string,
   type:string
}

export interface StaffTerminalData extends UserTerminalData{
    currentFlagSecret: string;
}

export interface CasinoSelectData{
    id : number
    airline_id : number
    airline_name : string
    initial_cost : number
    player_id : number
    is_playing : boolean
}

export interface CasinoTableData{
    id : number
    airline_id : number
    airline_name : string
    initial_cost : number
    player_id : number
    this_pot : number
}