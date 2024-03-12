"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import MotionBackground from "@/utils/MotionBackground";


export default function Home() {
    const radioMotion = {
        hover: {
            scale: 1.1,
        }
    };

    const clickMotion = {
        mainHover: {
            translateY: [0, -5],
            transition: {
                duration: 0.4,
                type: "spring",
                bounce: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
            },

        }
    };

    return (
        <AnimatePresence mode={"wait"}>
            <header>
                <title>Agus Setiawan Popalia</title>
            </header>
            <MotionBackground/>
            <main
                className="transition-all sm:text-xs md:text-sm h-screen p-10 flex justify-center items-center font-semibold">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{
                        duration: 1
                    }}
                    className="m-auto items-center flex-col flex gap-6 justify-center h-full">
                    <motion.div whileHover="mainHover"
                                className={"w-full shadow rounded-xl bg-blue-200/10 border-2 border-fuchsia-200/10 flex-col p-10 flex justify-center "}>
                        <p className={"mb-10"}>Agus Setiawan Popalia</p>
                        <div className={"m-auto w-9/12"}>
                            <Image className={"rounded-full align-middle"} src="/potrait.jpg" width={300}
                                   height={300}
                                   alt={"its me (at least if supposed to be my portrait)"}/>
                        </div>
                        <div className={"flex mt-10 align-middle justify-between"}>
                            <p>
                                Get To Know Me!
                            </p>
                            <motion.div variants={clickMotion}>
                                <Link className={"bg-blue-300 rounded-full flex items-center px-1 lg:px-5"}
                                      href={"/about"}>
                                    Click
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        className={"w-full shadow cursor-pointer rounded-full border-2 border-fuchsia-200/10 bg-blue-200/10 flex justify-center"}
                        whileHover="hover">
                        <Link className={"w-full flex justify-center"}
                              href={"/radio"}>
                            <motion.div
                                variants={radioMotion}
                                className={"transition-transform p-3"}>
                                Radio
                            </motion.div>
                        </Link>
                    </motion.div>
                    <motion.div
                        className={"w-full invert shadow  rounded-full p-3 border-2 border-fuchsia-200/10 bg-blue-200/10 flex justify-around"}>
                        <motion.div whileHover={{translateY: -5}}>
                            <Link href={"https://www.facebook.com/agussetiawan.popalia/"}>
                                <Image src={"/icons/facebook.png"} alt={"Facebook Account"} width={25} height={25}/>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{translateY: -5}}>
                            <Link href={"https://www.instagram.com/_sat.y/"}>
                                <Image src={"/icons/instagram.png"} alt={"Instagram Account"} width={25} height={25}/>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{translateY: -5}}>
                            <Link href={"https://www.linkedin.com/in/agus-setiawan-popalia/"}>
                                <Image src={"/icons/linkedin.png"} alt={"LinkedIn Account"} width={25} height={25}/>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{translateY: -5}}>
                            <Link
                                href={"https://wa.me/6281243896336?text=Hey%20Satya!%20I%20Just%20wanted%20to%20drop%20you%20a%20quick%20message%20to%20ask%20about%20a%20few%20things.%20Mind%20if%20we%20chat%3F\n"}>
                                <Image src={"/icons/whatsapp.png"} alt={"Whatsapp Account"} width={25} height={25}/>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>
        </AnimatePresence>)
}
