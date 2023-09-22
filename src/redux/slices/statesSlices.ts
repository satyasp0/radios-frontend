import {createSlice} from "@reduxjs/toolkit";

type statesState = {
    isPlaying?:boolean;
    isDarkMode?:boolean;
    isHidden?:boolean;
    isAllPlaceChannels?:boolean;
}

const initialState:statesState = {
    isPlaying:false,
    isDarkMode:false,
    isHidden:true,
    isAllPlaceChannels:false,
} as statesState

export const states = createSlice({
    name:"states",
    initialState,
    reducers:{
        setRadioIsPlaying:(state, action) => {
            state.isPlaying = action.payload
        },
        setIsDarkMode:(state, action) => {
            state.isDarkMode = action.payload
        },
        setIsHidden:(state, action) => {
            state.isHidden = action.payload
        },
        setIsAllPlaceChannels:(state, action) => {
            state.isAllPlaceChannels = action.payload
        }
    }
});

export const {
    setRadioIsPlaying,
    setIsDarkMode,
    setIsHidden,
    setIsAllPlaceChannels,
} = states.actions;

export default states.reducer