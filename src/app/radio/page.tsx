"use client"
import ParticleScene from "@/utils/threeTrial";
import React, { useEffect, useState } from "react";

export default function Radio() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const headerStyle = {
        opacity: isVisible ? 1 : 0, // Set opacity based on isVisible state
        transition: "opacity 1s ease", // Apply a transition to opacity property
    };

    return (
        <div className="radio-container">
            <ParticleScene />
            <div className="content">
                <main className="h-screen justify-center items-center text-amber-100 font-semibold">
                    {/* Apply the style to the header */}
                    <header style={headerStyle}>
                        <h1 className="flex justify-center p-5 text-2xl h-1/6">
                            Radio Roll
                        </h1>
                    </header>
                    <div className="m-auto items-center flex gap-52 justify-center h-5/6"></div>
                </main>
            </div>
        </div>
    );
}
