export type Source = {
    type: "terminal",
    terminalTitle: string,
    terminalId: number,
} | {
    type: "effect",
    airlineTitle: string,
    airlineId: number,
    effectTitle: string,
    effectId: number,
}

export interface Gain {
    passengerRate: number
    unitTime: number
    source: Source
}