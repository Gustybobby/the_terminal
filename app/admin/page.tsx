import Dashboard from "@/components/admin/dashboard";
import Pinger from "@/components/admin/pinger";
import { getServerAuthSession } from "../api/auth/[...nextauth]/_utils";
import { redirect } from "next/navigation";

export default async function Admin(){
    const session = await getServerAuthSession()
    if (session?.user.role !== "ADMIN"){
        redirect("/")
    }
    return (
        <main className="min-h-screen">
            <Dashboard/>
            <Pinger/>
        </main>
    )
}