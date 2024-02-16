import {createAsyncThunk} from "@reduxjs/toolkit";
import {radioDefaultHost} from "../../../config";

export const fetchPlaceChannels = createAsyncThunk(
    "placeChannels/fetchPlaceChannels",
    async (placeCode:string) => {
        try {
            const response = await fetch(radioDefaultHost+`/api/getAllChannelInPlace?code=${placeCode}`);
            const data = await response.json()
            console.log("Fetching Place Detail Successfully :", data);
            return data
        }catch (error) {
            console.error("Error in fetchPlaceChannel :", error);
            throw error;
        }
    }
)