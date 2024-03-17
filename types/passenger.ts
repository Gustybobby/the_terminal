export type Source = {
    type: "terminal",
    terminalTitle: string,
    terminalId: number,
} | {
    type: "effect",
    effectTitle: string,
}

export interface Gain {
    passengerRate: number
    unitTime: number
    source: Source
}