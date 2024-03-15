"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { REGEXP_ONLY_DIGITS_AND_CHARS  } from "input-otp"
import type { Dispatch, SetStateAction } from "react"

export default function StatusOTP({ value, setValue, className }: {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
    className : string
}){
    
    return (
        <InputOTP
            className = {`${className}`}
            value={value}
            onChange={(value) => {
                setValue(value)
            }}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
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