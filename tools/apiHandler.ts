export async function sendJSONToAPI({ url, method, body }: {
    url: string
    method: "POST" | "PATCH" | "PUT" | "DELETE",
    body: string
}){
    try {
        const res = await fetch(url, {
            method,
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await res.json()
        return response
    } catch(e){
        return { message: "ERROR" }
    }
}