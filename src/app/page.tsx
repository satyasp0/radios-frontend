"use client"
import Link from "next/link";
import React from "react";


export default function Home() {

  return (<>
    <header>
      <title>Agus Setiawan Popalia</title>
    </header>
    <div className="radio-container">
      <div className="content">
        <main className="h-screen justify-center items-center text-amber-100 font-semibold">
          <ul className="m-auto items-center flex lg:gap-52 gap-20 justify-center h-full">
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
