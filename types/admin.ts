import type { Airline, GameState } from "@prisma/client";
import { TerminalData } from "./terminal";

export interface AdminData {
    gameState: GameState
    airlines: Airline[]
    terminals: TerminalData[]
}