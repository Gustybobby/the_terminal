import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sendJSONToAPI } from "@/tools/apiHandler";
import type { Dispatch, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa";

const roles = [
  { name: "Captain", value: "Captain" },
  { name: "Crew", value: "Crew" },
];

export default function DropdownMenuDemo({
  airlineId,
  userId,
  airlineRole,
  refetch,
}: {
  airlineId: number,
  userId: string,
  airlineRole: string;
  refetch: Dispatch<SetStateAction<{}>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-32 flex flex-row justify-between border-black"
          disabled={airlineRole === "Co_pilot"}
        >
          <div>{roles.find((role) => role.value === airlineRole)?.name ?? "Co-pilot"}</div> <FaChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 border-black">
        <DropdownMenuGroup>
          {roles.map((role, index) => (
            <DropdownMenuItem
              key={index}
              className="border-b last:border-0 border-black rounded-none"
              onClick={async() =>{
                if(role.value === airlineRole){
                  return
                }
                await sendJSONToAPI({
                  url: `/api/airlines/${airlineId}/lobby/${userId}`,
                  method: "POST",
                  body: JSON.stringify({ data: role.value })
                })
                refetch({})
              }                
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
