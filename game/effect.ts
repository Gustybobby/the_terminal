//EMP everyone
export const disableCPE = {
    class: "CPE",
    effect: "global",
    limit: 1,
    durationPercentage: 0.05,
}

export const foundationCE = {
    class: "CE",
    effect: "self",
    limit: 1,
    durationPercentage: 0.5,
    maxTerminal: 2,
    multiplier: 2,
}

export const explosionChE = {
    class: "ChE",
    effect: "global",
    limit: 1,
}

export const duelEE = {
    class: "EE",
    effect: "airline",
    limit: 1,
    multiplier: 5,
    lossTerminal: 1,
    lock: 300, 
}

export const logisticIE = {
    class: "IE",
    effect: "self",
    limit: 1,
    intervalFactor: 0.5,
    durationPercentage: 0.05,
}

export const sabotageME = {
    class: "ME",
    effect: "airline",
    limit: 1,
    maxArline: 2,
    lock: 120,
    multiplier: 0.75
}

export const decisionDE = {
    class: "DE",
    effect: "self",
    limit: 2,
    multiplier: 0.8,
    duration: 60,
    timeLimit: 120,
}

export const investmentBA = {
    class: "BA",
    effect: "terminal",
    limit: 2,
    multiplier: 3,
    duration: 60,
}
