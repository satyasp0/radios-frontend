import {createSlice} from "@reduxjs/toolkit";

type statesState = {
    isPlaying?:boolean;
    isDarkMode?:boolean;
    isHidden?:boolean;
    isAllPlaceChannels?:boolean;
    nowPlayingId?:string;
    nextPlayingId?:string;
    previousPlayingId?:string;
}

const initialState:statesState = {
    isPlaying:false,
    isDarkMode:false,
    isHidden:true,
    isAllPlaceChannels:false,
    nowPlayingId:"",
    nextPlayingId:"",
    previousPlayingId:""
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
} = states.actions;

export default states.reducer