"use client";

import { useState } from "react";

import * as React from "react";
import LobbyCard from "@/components/lobby/lobby-class-card";
import ClassDrawerContent from "@/components/lobby/lobby-class-drawer-content";

import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import type { Faction } from "@/types/terminal";
import { LoadingSpinner } from "../ui/loading-spinner";

const factions = [
  {
    id: 1,
    name: "CPE | Computer Engineering",
    ability_name: "Disable",
    use: 1,
    type: "debuff",
    description:
      "สามารถหยุดการใช้งานโปรแกรมของ airline หนึ่งไปและไม่สามารถจะทำใช้งานอะไรได้เป็นระยะเวลา 5% ของเฟสนั้น (หยุดการที่จะสามารถ capture terminal กับ view info ต่างๆ)",
  },
  {
    id: 2,
    name: "CE | Civil Engineering",
    ability_name: "Foundation Matters",
    use: 1,
    type: "Stackable Buff",
    description:
      "เมื่อครอบครอง terminal ไหนเกินระยะเวลา 50% ของเฟส  passenger rate ณ Terminal นั้น เพิ่มขึ้น X2 จนกว่าเวลาจะหมด (effect นี้สามารถ stack ได้ แต่ได้สูงสุด 2 Terminal) โดย effect  ของ class นี้จะหมดไปก็ต่อเมื่อ  Terminal  ที่ได้ผล effect ถูกยึดโดยมีผลต่อTerminal อีกอันที่ไม่ถูกยึดด้วยหากมี",
  },
  {
    id: 3,
    name: "ChE | Chemical Engineering",
    ability_name: "Lab Explosion",
    use: 1,
    type: "Global Sabotage",
    description:
      "สามารถจะ remove หนึ่งคนจากทีมอื่นๆ ทั้งหมดสำหรับเกมที่มี crew จาก class นี้อยู่ได้ ทำให้ไม่สามารถที่จะเข้าร่วมในการเล่นกิจกรรมขณะนั้นได",
  },
  {
    id: 4,
    name: "EE | Electrical Engineering",
    ability_name: "Power Surge",
    use: 1,
    type: "Global ",
    description:
      "สามารถที่จะท้าประลองกับ Global ( Airline ที่ท้าส่งตัวแทนมา 1 คน Global ส่งตัวแทนอีก 1 คน ) ได้ด้วยการจั่วไพ่ 1 ใบ หากทีมที่ท้าได้ไพ่แต้มสูงกว่าจะได้  passenger rate x5 เท่า  เป็นเวลา 1 นาที นั้น แต่ถ้าหากแพ้ จะต้อง สูญเสียTerminal 1 Terminal และฟรีสเป็นเวลา 5 นาที (แต่ถ้าหากไม่มีTerminalเลยจะต้อง ฟรีส เวลาเป็น 1 นาที)",
  },
  {
    id: 5,
    name: "IE | Industrial Engineering",
    ability_name: "Logistics Boost",
    use: 1,
    type: "Global Buff",
    description:
      "สามารถที่จะ half time interval ของ passenger rate ที่เข้ามาได้เป็นระยะเวลา 5% ของเฟสนั้น Ex. จาก 100 passengers / 5 sec => 100 Ps / 2.5 Sec",
  },
  {
    id: 7,
    name: "ME | Mechanical Engineering",
    ability_name: "Machine Sabotage",
    use: 1,
    type: "Debuff",
    description:
      "สามารถเลือก Airline ที่จะ sabotage ได้ 2 airline โดยเลือกระหว่าง 1 . freeze เป็นเวลา 2 นาที หรือ  passengers rate ลดลง 25 % (airline ที่มี class นี้เป็นคนมีสิทธิ์เลือก แต่ airline ไหนมีคลาสนี้อยู่แล้วจะไม่ถูกผล effect)",
  },
  {
    id: 8,
    name: "DE | Digital Engineering",
    ability_name: "Decision Making",
    use: 2,
    type: "Debuff",
    description:
      "มีสองทางเลือก 1. สามารถป้องกัน Terminal ตัวเองได้ 1 ครั้ง เมื่อแพ้ แต่ต้องสูญเสีย 20% ของ passengers rate 2. เพิ่ม passenger rate 2 เท่า เป็นระยะเวลา 1 นาที เมื่อยึด Terminal ใหม่ (หากจะเลือกตัวเลือกนี้ ต้องมี Terminal ครอบครองอยู่แล้วอย่างน้อย 1 Terminal) โดย ตัวเลือกนี้จะต้องถูกใช้ภายในระยะเวลา 2 นาทีแรกของเวลาเฟส",
  },
  {
    id: 9,
    name: "ฺBA | Business & Analysis",
    ability_name: "Investment",
    use: 1,
    type: "Double-edged Buff",
    description:
      "สามารถที่ 3x passengers rate กับ terminal ให้เป็น buff ชั่วคราวได้โดยจะมีผลเป็นระยะเวลา 1 นาทีของเฟสนั้นๆ",
  },
] as Faction[];

export default function ClassCardGroup() {
  const [clickedFactionIndex, setClickedFactionIndex] = useState<number | null>(
    null
  );

  return (
    <Drawer>
      {factions.map((faction: Faction, i) => (
        <DrawerTrigger
          key={`trigger-${faction.name}`}
          className="mb-2"
          onClick={() => {
            setClickedFactionIndex(i);
          }}
        >
          <LobbyCard
            key={faction.id}
            faction={faction}
            className="min-w-[2rem] w-[21rem] hover:bg-gray-200 transition-colors"
          />
        </DrawerTrigger>
      ))}
      {clickedFactionIndex !== null && (
        <ClassDrawerContent
          faction={factions[clickedFactionIndex]}
          className=""
        />
      )}
    </Drawer>
  );
}
