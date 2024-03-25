import { Faction } from "@/types/terminal";

export const FACTION_MAP = {
    ICT: {
      id: 1,
      name: "School of ICT",
      abbreviation: "ICT",
      ability_name: "Disable",
      use: 1,
      duration: -1,
      duration_factor: 0.05,
      type: "Airline Debuff",
      description:
        "Disabled Debuff จะทำให้เกิดสองอย่าง : 1. หยุดการใช้งานโปรแกรมของ airline หนึ่งไป ทำไม่สามารถใช้งาน device เป็นระยะเวลา 5% ของเฟสนั้น (หยุดการcapture terminal กับ view info ต่างๆ)  2. ทำให้ passengers rate ลดลง 20% ทุกๆ terminal (20 P / 5 Sec ->  16 / 5 Sec)",
    },
    MSME: {
      id: 2,
      name: "School of MSME",
      abbreviation: "MSME",
      ability_name: "Logistics Boost",
      use: 1,
      duration: -1,
      duration_factor: 0.05,
      type: "Airline Buff",
      description:
        "สามารถที่จะ half time interval ของ passenger rate ที่เข้ามาได้เป็นระยะเวลา 5% ของเฟสนั้น Ex. จาก 100 Ps / 20 sec => 100 Ps / 10 Sec for 2 minutes",
    },
    BCET: {
      id: 3,
      name: "School of BCET",
      abbreviation: "BCET",
      ability_name: "Lab Explosion",
      use: 1,
      duration: 5000,
      duration_factor: 1,
      type: "Global Sabotage",
      description:
        "ทำให้ทุกเกมที่มี Crew จาก Class School of BCET ต้องนำ 1 คนจากทีมอื่นๆ  ออกไปจากการเล่นกิจกรรมครั้งนั้น ทำให้ไม่สามารถที่จะเข้าร่วมในการเล่นกิจกรรมนั้นได้",
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
      description:
        "เมื่อครอบครอง terminal ไหนเกินระยะเวลา 50% ของเฟสนั้น  passenger rate ของ Terminal น้้น x3 จนกว่าเวลาจะหมด แต่ว่าเมื่อ  Terminal  ที่ได้ effect นี้ถูกยึดไป ตัวความสามารถจะไม่ทำงานและหยุดการ activate สามารถ apply effect นี้ได้กับ 2 terminal",
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
    FACTION_MAP["CET"],
]

/**MT: {
      id: 4,
      name: "School of MT",
      ability_name: "Decision Making",
      abbreviation: "MT",
      use: 2,
      duration: 60000,
      duration_factor: 1,
      type: "Terminal Buff/Protection",
      description:
        "ธุรกิจมีทั้งข้อดีข้อเสียขอให้เลือกชอยส์ที่ถูกโดยจะมีสองชอยส์เป็น 1. สามารถป้องกัน Terminal ตัวเองได้ 1 ครั้ง เมื่อแพ้ แต่ต้องสูญเสีย 10% passengers rate  2. สามารถ 3x passengers rate กับ terminal ให้เป็น buff ชั่วคราวได้โดยจะมีผลเป็นระยะเวลา 1 นาทีของเฟสนั้นๆ",
    }, */