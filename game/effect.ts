//EMP everyone
export const disableCPE = {
    class: "CPE",
    title: "Disable",
    effect: "global",
    limit: 1,
    durationPercentage: 0.05,
}

export const foundationCE = {
    class: "CE",
    title: "Foundation Matters",
    effect: "self",
    limit: 1,
    durationPercentage: 0.5,
    maxTerminal: 2,
    multiplier: 2,
}

export const explosionChE = {
    class: "ChE",
    title: "Lab Explosion",
    effect: "global",
    limit: 1,
}

export const duelEE = {
    class: "EE",
    title: "Duel",
    effect: "airline",
    limit: 1,
    multiplier: 5,
    lossTerminal: 1,
    lock: 300, 
}

export const logisticIE = {
    class: "IE",
    title: "Logistics Boost",
    effect: "self",
    limit: 1,
    intervalFactor: 0.5,
    durationPercentage: 0.05,
}

export const sabotageME = {
    class: "ME",
    title: "Machine Sabotage",
    effect: "airline",
    limit: 1,
    maxArline: 2,
    lock: 120,
    multiplier: 0.75
}

export const decisionDE = {
    class: "DE",
    title: "Decision Making",
    effect: "self",
    limit: 2,
    multiplier: 0.8,
    duration: 60,
    timeLimit: 120,
}

export const investmentBA = {
    class: "BA",
    title: "Investment",
    effect: "terminal",
    limit: 2,
    multiplier: 3,
    duration: 60,
}

export const classEffect = {
    CPE: disableCPE,
    DE: decisionDE,
    ChE: explosionChE,
    CE: foundationCE,
    EE: duelEE,
    IE: logisticIE,
    ME: sabotageME,
    BA: investmentBA,
}
