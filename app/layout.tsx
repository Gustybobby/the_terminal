import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ForceSignOut from "@/components/auth/foce-signout";
import { getServerAuthSession } from "./api/auth/[...nextauth]/_utils";
import AuthProvider from "@/components/auth/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "The Terminal",
    description: "By SIIT Insight Camp 2024",
};

export default async function RootLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerAuthSession()
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider session={session}>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
