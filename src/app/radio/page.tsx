"use client"
import React, {useEffect, useState} from "react";
import Player from "./UseRadioPlayer";
import {AnimatePresence, motion} from "framer-motion";
import ParticleScene from "@/utils/ParticleSystemBackground";
import Typewriter from "typewriter-effect";

export default function Radio() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isParticleSceneVisible, setIsParticleSceneVisible] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsParticleSceneVisible(true);
        }, 1500);
        return () => clearTimeout(delay);
    }, []);

    const headerStyle = {
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s ease",
    };

    return (
        <AnimatePresence mode={"wait"}>
            {!isParticleSceneVisible && (
                <motion.div
                    className={"w-full h-full flex items-center justify-center m-auto text-white "}
                    initial={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: -2,
                        backgroundColor: "black",
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                >
                    <div className={"flex flex-col justify-center items-center"}>
                        <p>fetching data</p>
                        <Typewriter
                            options={{
                                strings: ['........'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                </motion.div>
            )}
            {(isParticleSceneVisible &&
                <><ParticleScene/>
                    <div
                        className="radio-container">
                        <div className="content">
                            <main
                                className="min-h-screen flex flex-col justify-between items-center text-amber-200 font-semibold">
                                <header style={headerStyle} className="h-1/6 w-full">
                                    <h1 className="flex justify-center p-5 font-bold text-3xl">
                                        Radio Roll
                                    </h1>
                                </header>

                                <div className="h-1/6">
                                    <div className="md:fixed sm:w-full md:w-2/5 lg:w-1/5 p-2 bottom-3 md:left-0">
                                        <Player/>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
        ;
}
