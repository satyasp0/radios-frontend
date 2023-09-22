import {createAsyncThunk} from "@reduxjs/toolkit";
import {radioDefaultEndpoint} from "../../../config";

export const fetchPlaceDetail = createAsyncThunk(
    "placeDetail/fetchPlaceDetail",
    async (placeCode:string) =>{
        try {
            const response = await fetch(radioDefaultEndpoint+`/place/${placeCode}`);

            const data = await response.json()
            console.log("Fetching Place Detail Successfully :", data);
            return data
        }catch (error) {
            console.error("Error in fetchPlaceDetail :", error);
            throw error;
        }
    }

)