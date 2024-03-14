"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { REGEXP_ONLY_DIGITS  } from "input-otp"
import type { Dispatch, SetStateAction } from "react"

export default function JoinOTP({ value, setValue }: {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}){
    return (
        <InputOTP
            value={value}
            onChange={(value) => {
                setValue(value)
            }}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            render={({ slots }) => (
                <>
                    <InputOTPGroup>
                        {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} className="border-black size-10 bg-white"/>
                        ))}{" "}
                    </InputOTPGroup>
                </>
            )}
        />
    )
}