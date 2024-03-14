import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "The Terminal",
    description: "By SIIT Insight Camp 2024",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
