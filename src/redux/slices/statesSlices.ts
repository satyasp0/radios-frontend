import {createSlice} from "@reduxjs/toolkit";

type statesState = {
    isPlaying?:boolean;
    isDarkMode?:boolean;
    isHidden?:boolean;
    isAllPlaceChannels?:boolean;
    nowPlayingId?:string;
    nextPlayingId?:string;
    previousPlayingId?:string;
    primaryColor?:RGBAColor;
    secondaryColor?:RGBAColor;
}

const initialState:statesState = {
    isPlaying:false,
    isDarkMode:false,
    isHidden:true,
    isAllPlaceChannels:false,
    nowPlayingId:"",
    nextPlayingId:"",
    previousPlayingId:"",
    primaryColor:{ r: 29, g: 78, b: 216, a: 0.2 },
    secondaryColor:{ r: 241, g: 245, b: 249, a: 0.2 },
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
        },
        setNowPlayingId:(state,action) => {
            state.nowPlayingId = action.payload;
        },
        setNextPlayingId:(state, action)=>{
            state.nextPlayingId = action.payload;
        },
        setPreviousPlayingId:(state, action) => {
            state.previousPlayingId = action.payload;
        },
        setPrimaryColor:(state, action)=>{
            state.primaryColor = action.payload;
        },
        setSecondaryColor:(state,action)=>{
            state.secondaryColor = action.payload;
        }
    }
});

export const {
    setRadioIsPlaying,
    setIsDarkMode,
    setIsHidden,
    setIsAllPlaceChannels,
    setNowPlayingId,
    setPreviousPlayingId,
    setNextPlayingId,
    setPrimaryColor,
    setSecondaryColor
} = states.actions;

export default states.reducer