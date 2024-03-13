"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { REGEXP_ONLY_DIGITS  } from "input-otp"
import type { Dispatch, SetStateAction } from "react"

export default function JoinOTP({ setValue }: {
    setValue: Dispatch<SetStateAction<string>>
}){
    return (
        <InputOTP
            onChange={(value) => {
                setValue(value)
            }}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            render={({ slots }) => (
                <>
                    <InputOTPGroup>
                        {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} className="border-black size-10"/>
                        ))}{" "}
                    </InputOTPGroup>
                </>
            )}
        />
    )
}