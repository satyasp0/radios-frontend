import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Providers} from "@/redux/provider";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Playground',
    description: 'Agus Setiawan Popalia Portofolios Project',
}

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={"text-xs md:text-sm lg:text-base"}>
            <body className={inter.className}>
                    <Providers>
                        {children}
                    </Providers>
            </body>
        </html>
    )
}
