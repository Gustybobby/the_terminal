import { randomInt } from "crypto"

export function randomSixDigits(){
    let pass = ""
    for(var i=0;i<6;i++){
        pass += randomInt(0,10).toString()
    }
    return pass
}