"use client"
import React from 'react';
import Typewriter from "typewriter-effect"

const Radio = () => {
    return (
        <div className={"h-full w-full flex flex-col items-center"}>
            <Typewriter
                options={{
                    strings: ['Hi, my name is Agus Setiawan Popalia, I\'m a dedicated backend engineer,' +
                    'possessing moderate proficiency in both Node.js and Java. Eager to leverage my skills to create efficient and ' +
                    'impactful solutions for diverse projects. ' +
                    'Let\'s connect and explore opportunities together!'],
                    autoStart: true,
                    loop: true,
                }}
            />
        </div>
    )
};

export default Radio;
