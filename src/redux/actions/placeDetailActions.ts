import {createAsyncThunk} from "@reduxjs/toolkit";
import {radioDefaultHost} from "../../../config";

export const fetchPlaceDetail = createAsyncThunk(
    "placeDetail/fetchPlaceDetail",
    async (param:BasePayloadCreatorDto) =>{
        try {
            const host = param.hostName ?? radioDefaultHost;
            const response = await fetch(host+`/api/getPlaceDetail?code=${param.code}`);
            const data = await response.json()
            console.log("Fetching Place Detail Successfully :", data);
            return data
        }catch (error) {
            console.error("Error in fetchPlaceDetail :", error);
            throw error;
        }
    }

)