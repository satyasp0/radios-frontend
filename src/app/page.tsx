"use client"
import Link from "next/link";
import ParticleScene from "@/utils/ParticleSystemBackground";
import React from "react";
import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {decrement, increment, reset} from "@/redux/slices/counterSlices";


export default function Home() {
  const count = UseAppSelector((state) => state.counterReducer.value);
  const dispatch = UseAppDispatch();

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

          <h4 style={{ marginBottom: 16 }}>{count}</h4>
          <button onClick={() => dispatch(increment())}>increment</button>
          <button
              onClick={() => dispatch(decrement())}
              style={{ marginInline: 16 }}
          >
            decrement
          </button>
          <button onClick={() => dispatch(reset())}>reset</button>

        </main>
      </div>
    </div>
  </>)
}
