import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "@/redux/provider";
import ParticleScene from "@/utils/ParticleSystemBackground";
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Agus Setiawan Popalia Portofolios Project',
}

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" className={""}>
      <body className={inter.className}>
      <ParticleScene />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
