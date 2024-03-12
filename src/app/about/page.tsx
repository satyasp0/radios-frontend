"use client"
import React from 'react';
import Typewriter from "typewriter-effect"
import {AnimatePresence, motion} from "framer-motion";
import MotionBackground from "@/utils/MotionBackground";

const Radio = () => {
    return (
        <AnimatePresence mode={"wait"}>
            <MotionBackground/>
            <div className="h-screen flex justify-center items-center">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{
                        duration: 1
                    }}
                    className={"text-center w-1/2"}>
                    <p className={"font-bold space-x-1 "}>This Page Is Still Under Construction</p>
                    <Typewriter
                        options={{
                            strings: ['Hi, my name is Agus Setiawan Popalia, i\'m a dedicated backend engineer,' +
                            'possessing moderate proficiency in both Node.js and Java. Eager to leverage my skills to create efficient and ' +
                            'impactful solutions for diverse projects. ' +
                            'Let\'s connect and explore opportunities together!'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </motion.div>
            </div>
        </AnimatePresence>
    )
};

export default Radio;
