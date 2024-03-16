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