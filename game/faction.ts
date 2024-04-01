import { Faction } from "@/types/terminal";

export const FACTION_MAP = {
    ICT: {
      id: 1,
      name: "School of ICT",
      abbreviation: "ICT",
      ability_name: "Hack",
      use: 2,
      duration: -1,
      duration_factor: 0.25,
      type: "Airline Debuff",
      description:
        "Hack จะทำให้เกิดสองอย่าง :\n1. หยุดการใช้งานโปรแกรมของ Airline ไป 1 Airline ทำให้ไม่สามารถใช้ Capture Terminal/Use Skill/View Info ได้เป็นระยะเวลา 25% ของ phase\n2. ขโมย passenger rate 20% ทุกๆ terminal เป็นระยะเวลา 25% ของ phase",
    },
    MSME: {
      id: 2,
      name: "School of MSME",
      abbreviation: "MSME",
      ability_name: "Logistics Boost",
      use: 2,
      duration: -1,
      duration_factor: 0.25,
      type: "Airline Buff",
      description:
        "ทำให้ time interval ของ passenger rate ลดลงเหลือ 25% ทุก terminal ที่ครอบครองเป็นระยะเวลา 25% ของ phase\nEx. 100 Ps / 20 sec => 100 Ps / 5 Sec\n*** ผลของสกิลจะหยุดทันทีเมื่อถูก airline อื่นยึดไป",
    },
    BCET: {
      id: 3,
      name: "School of BCET",
      abbreviation: "BCET",
      ability_name: "Lab Explosion",
      use: 3,
      duration: -1,
      duration_factor: 1,
      type: "Global Sabotage",
      description: [
        "สามารถเลือกได้ 1 อย่าง",
        "1. ทำให้ทีมอื่นที่เล่นอยู่ใน terminal นั้นออกไปจากตัวเกมและสามารถยึดฐานนั้นได้ทันที",
        "(วิธีใช้: Captain ให้ Activation Code กับ Terminal Staff)",
        "2. ทำให้เกิด effect “Exploded” , ซึ่งทำให้ Terminal passenger rate ลดลง 50% เป็นระยะเวลา 5 นาที",
      ].join("\n")
    },
    CET: {
      id: 5,
      name: "School of CET",
      abbreviation: "CET",
      ability_name: "Foundation Matters",
      use: 1,
      duration: -1,
      duration_factor: 1,
      type: "Passive Buff",
      description: [
        "เมื่อครอบครอง terminal ไหนเกินระยะเวลา 50% ของ phase passenger rate ของ terminal น้้น x3 จนกว่าจะหมด phase",
        "*** ผลของสกิลจะหยุดทันทีเมื่อถูก airline อื่นยึดไป",
      ].join("\n")
    },
    MT: {
      id: 4,
      name: "School of MT",
      ability_name: "Decision Making",
      abbreviation: "MT",
      use: 2,
      duration: -1,
      duration_factor: 1,
      type: "Terminal Buff/Protection",
      description: [
        "ธุรกิจมีทั้งข้อดีข้อเสีย ให้เลือก 1 อย่าง",
        "1. ป้องกัน Terminal ตัวเองได้ 1 ครั้ง เมื่อแพ้ แต่ต้องสูญเสีย 10% passenger rate",
        "(วิธีใช้: Captain ให้ Activation Code กับ Terminal Staff)",
        "2. 3x passenger rate กับ terminal เป็นระยะเวลา 5 นาที"
      ].join("\n")
    },
    None: {
        id: 999,
        name: "None",
        abbreviation: "None",
        ability_name: "None",
        use: 0,
        duration: 0,
        duration_factor: 0,
        type: "None",
        description: "None"
    }
} as { [faction: string]: Faction };

export const FACTIONS = [
    FACTION_MAP["ICT"],
    FACTION_MAP["MSME"],
    FACTION_MAP["BCET"],
    FACTION_MAP["MT"],
    FACTION_MAP["CET"],
]