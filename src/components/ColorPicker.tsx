import React, { useState } from 'react';
import {RgbaColor, RgbaColorPicker} from "react-colorful";
import {getRGBValues} from "@/utils/rgbToHex";
import {setPrimaryColor, setSecondaryColor} from "@/redux/slices/statesSlices";
import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {AnimatePresence, motion} from "framer-motion";

const ColorPickerComponent = () => {
    const dispatch = UseAppDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

    const {
        primaryColor,
        secondaryColor
    } = UseAppSelector((state) => state.states)
    const togglePicker = () => {
        setShowPicker(!showPicker);
        setShowSecondaryPicker(false)
    };

    const toggleSecondaryPicker = () => {
        setShowSecondaryPicker(!showSecondaryPicker);
        setShowPicker(false)
    };

    const handleColorChange = (newColor: RgbaColor, colorType:string) => {
        if (colorType === "primary") {
            dispatch(setPrimaryColor(newColor));
        } else if (colorType === "secondary") {
            dispatch(setSecondaryColor(newColor));
        }
    };

    return (
        <div className={"flex justify-between px-6"}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <button
                    style={{ backgroundColor: getRGBValues(primaryColor) }}
                    className="h-4 w-4 rounded-xl border-slate-200 border-2"
                    onClick={togglePicker}
                ></button>
                <AnimatePresence>
                {showPicker && (
                    <motion.div
                        animate     =   {{ scale: [0, 1]}}
                        exit        =   {{ scale: [1,0]}}
                        transition  =   {{
                            duration: 1,
                            type: "spring"
                        }}
                        style={{ position: 'absolute', top: '-850%', left: '50%'}}>
                        <RgbaColorPicker color={primaryColor} onChange={(newColor) => handleColorChange(newColor, "primary")} />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <button
                    style={{ backgroundColor: getRGBValues(secondaryColor) }}
                    className="h-4 w-4 rounded-xl border-slate-200 border-2"
                    onClick={toggleSecondaryPicker}>
                </button>
                <AnimatePresence>
                {showSecondaryPicker && (
                    <motion.div
                        animate     =   {{ scale: [0, 1]}}
                        exit        =   {{ scale: [1,0]}}
                        transition  =   {{
                            duration: 1,
                            type: "spring"
                        }}
                        style={{ position: 'absolute', top: '-850%', right: '50%'}}
                    >

                        <RgbaColorPicker color={secondaryColor} onChange={(newColor) => handleColorChange(newColor, "secondary")} />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ColorPickerComponent;
