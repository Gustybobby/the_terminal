export type Source = {
    type: "terminal",
    terminalTitle: string,
    terminalId: number,
} | {
    type: "effect",
    effectTitle: string,
}

export interface Gain {
    passengerRate: number | "unknown"
    unitTick: number
    source: Source
}