import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LobbyTableData } from "@/types/airline";
import type { Dispatch, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa";

const roles = [
  { name: "Captain", value: "Captain" },
  { name: "Co-Pilot", value: "Co_Pilot" },
  { name: "Crew", value: "Crew" },
];

export default function DropdownMenuDemo({
  role,
  index,
  setTableData,
}: {
  role: string;
  index: number;
  setTableData: Dispatch<SetStateAction<LobbyTableData[]>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-32 flex flex-row justify-between border-black"
        >
          <div>{role}</div> <FaChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 border-black">
        <DropdownMenuGroup>
          {roles.map((role) => (
            <DropdownMenuItem
              className="border-b last:border-0 border-black rounded-none"
              onClick={() =>
                setTableData((tableData) => {
                  const newTableData = tableData.map((row, i) => {
                    return i === index
                      ? { ...row, role: role.value }
                      : { ...row };
                  });
                  newTableData.sort((a, b) => {
                    return (
                      roles.findIndex((role) => a.role === role.value) -
                      roles.findIndex((role) => b.role === role.value)
                    );
                  });
                  return newTableData;
                })
              }
            >
              {role.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
