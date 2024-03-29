import prisma from "@/prisma-client"

export async function updateTerminalSecret(terminalId: number){
    await prisma.$transaction(async(tx) => {
        const secrets = await tx.terminal.findMany({
            select: {
                secret: true
            }
        })
        let newSecret = generateNDigits(6)
        while(secrets.map(({ secret }) => secret).includes(newSecret)){
            newSecret = generateNDigits(6)
        }
        await tx.terminal.update({
            where: {
                id: terminalId
            },
            data: {
                secret: newSecret
            }
        })
        console.log("updated",terminalId,"secret to",newSecret)
    })
}

function generateNDigits(n: number){
    const list = [0,1,2,3,4,5,6,7,8,9]
    let random = ""
    for(var i=0;i<n;i++){
        random += list[Math.min(Math.round(Math.random()*10),9)].toString()
    }
    return random
}