"use client"
import React, { useEffect, useState } from "react";
import Player from "./UseRadioPlayer";

export default function Radio() {
    const [isVisible, setIsVisible] = useState<boolean>(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const headerStyle = {
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s ease",
    };

    return (
        <div className="radio-container">
            <div className="content">
                <main className="min-h-screen flex flex-col justify-between items-center text-amber-200 font-semibold">
                    <header style={headerStyle} className="h-1/6 w-full">
                        <h1 className="flex justify-center p-5 font-bold text-3xl">
                            Radio Roll
                        </h1>
                    </header>


                    <div className="h-1/6">
                        {/* Player Component */}
                        <div className="md:fixed sm:w-full md:w-2/5 lg:w-1/5 p-2 bottom-3 md:left-0">
                            <Player />
                        </div>
                    </div>
                </main>
            </div>
        </div>


    );
}
