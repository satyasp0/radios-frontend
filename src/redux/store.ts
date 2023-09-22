import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/slices/counterSlices";
import nowPlaying from "@/redux/slices/nowPlayingSlices";
import placeDetail from "@/redux/slices/placeDetailSlices"
import states from "@/redux/slices/statesSlices";
import allPlaceChannelsSlice from "@/redux/slices/allPlaceChannelsSlice";
export const store = configureStore({
    reducer: {
        counterReducer,
        nowPlaying,
        placeDetail,
        states,
        allPlaceChannelsSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
