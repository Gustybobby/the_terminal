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
export interface StaffTerminalData extends UserTerminalData{
    currentFlagSecret: string;
}