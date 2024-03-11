"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import MotionBackground from "@/utils/MotionBackground";


export default function Home() {
    return (<>
        <header>
            <title>Agus Setiawan Popalia</title>
        </header>
        <MotionBackground/>
        <main
            className="transition-all sm:text-xs md:text-sm h-screen p-10 flex justify-center items-center font-semibold">
            <div
                className="m-auto items-center flex-col flex gap-6 justify-center h-full">
                <motion.div whileHover={{scale: 1.05}}
                            className={"w-full rounded-xl bg-blue-200/10 border-2 border-fuchsia-200/10 flex-col p-10 flex justify-center "}>
                    <a className={"mb-10"}>Agus Setiawan Popalia</a>
                    <div className={"m-auto w-9/12"}>
                        <Image className={"rounded-full align-middle"} src="/potrait.jpg" width={300}
                               height={300}
                               alt={"its me (at least if supposed to be my potrait)"}/>
                    </div>
                    <div className={"flex mt-10 align-middle justify-between"}>
                        <p>
                            Get To Know Me!
                        </p>
                        <Link className={"bg-blue-300 rounded-full flex items-center px-1 lg:px-5"} href={"/about"}>
                            Click
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    className={"w-full cursor-pointer rounded-full border-2 border-fuchsia-200/10 bg-blue-200/10 flex justify-center"}
                    whileHover={{scale: 1.05}}>
                    <Link className={"w-full flex justify-center"}
                          href={"/radio"}>
                        <div
                            className={"transition-transform p-3"}>
                            Radio
                        </div>
                    </Link>
                </motion.div>
            </div>
        </main>
    </>)
}
