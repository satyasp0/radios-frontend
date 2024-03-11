import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const MotionBackground: React.FC = () => {
    const [key, setKey] = useState<string>('');

    useEffect(() => {
        setKey(generateRandomKey(10));
    }, []);

    const getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const alpha = Math.random() * 0.4 + 0.6;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const generateRandomKey = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    return (
        <div
            style={{
                zIndex: "-1",
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: 'black',
            }}>
            <div style={{ filter: 'blur(80px)', width: '100%', height: '100%' }}>
                {[...Array(5)].map((_, index) => (
                    <motion.div
                        key={`${key}-${generateRandomKey(10)}`} // Ensure each circle has a unique key
                        style={{
                            width: `${getRandomNumber(400, 900)}px`,
                            height: `${getRandomNumber(500, 900)}px`,
                            backgroundColor: getRandomColor(),
                            borderRadius: '50%',
                            position: 'absolute',
                            zIndex: index,
                        }}
                        animate={{
                            top: [
                                `${getRandomNumber(10, 60)}vh`,
                                `${getRandomNumber(20, 70)}vh`
                            ],
                            left: [
                                `${getRandomNumber(0, 60)}vw`,
                                `${getRandomNumber(0, 60)}vw`
                            ],
                            rotate: [0, 30, 164]
                        }}
                        transition={{ type: "spring", duration: 10, bounce: 0.4, repeat: Infinity, repeatType: "reverse" }}
                    ></motion.div>
                ))}
            </div>
        </div>
    );
};

export default MotionBackground;
