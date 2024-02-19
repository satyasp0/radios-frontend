import {createAsyncThunk} from "@reduxjs/toolkit";
import {radioDefaultHost} from "../../../config";

export const fetchPlaceChannels = createAsyncThunk(
    "placeChannels/fetchPlaceChannels",
    async (param:BasePayloadCreatorDto) => {
        try {
            const host = param.hostName ?? radioDefaultHost;
            const response = await fetch(host+`/api/getAllChannelInPlace?code=${param.code}`);
            const data = await response.json()
            console.log("Fetching Place Detail Successfully :", data);
            return data
        }catch (error) {
            console.error("Error in fetchPlaceChannel :", error);
            throw error;
        }
    }
)