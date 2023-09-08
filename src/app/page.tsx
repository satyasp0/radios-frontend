"use client"
import Link from "next/link";
import ParticleScene from "@/utils/threeTrial";
import React from "react";

export default function Home() {
  return (<>
    <header>
      <title>Agus Setiawan Popalia</title>
    </header>
    <div className="radio-container">
      <ParticleScene />
      <div className="content">
        <main className="h-screen justify-center items-center text-amber-100 font-semibold">
          <header>
            <h1 className="flex justify-start p-5 text-2xl h-1/6">
              Hello
            </h1>
          </header>
          <ul className="m-auto items-center flex gap-52 justify-center h-5/6">
            <li >
              <div className={"hover:text-amber-200 hover:animate-float-and-wiggle transition-transform p-3"}>
                <Link href={"/about"}>About Me</Link>
              </div>
            </li>
            <li >
              <div className={"hover:text-amber-200 hover:animate-float-and-wiggle transition-transform p-3"}>
                <Link href={"/radio"}>Radio</Link>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </div>
  </>)
}
