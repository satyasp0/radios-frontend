"use client"
import Link from "next/link";

export default function Home() {
  return (<>
    <header>
      <title>Agus Setiawan Popalia</title>
    </header>
    <main className="h-screen justify-center items-center">
      <header>
        <h1 className="flex justify-start p-5 text-2xl h-1/6">
          Hello
        </h1>
      </header>
      <ul className="m-auto items-center flex gap-52 justify-center h-5/6">
        <li>
          <Link href={"/about"}>About Me</Link>
        </li>
        <li>
          <Link href={"/radio"}>Radio</Link>
        </li>
      </ul>
    </main>
  </>)
}
