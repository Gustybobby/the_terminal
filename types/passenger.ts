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
    unitTick: number
    source: Source
}