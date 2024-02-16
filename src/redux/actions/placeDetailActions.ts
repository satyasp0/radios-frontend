import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPlaceDetail = createAsyncThunk(
    "placeDetail/fetchPlaceDetail",
    async (placeCode:string) =>{
        try {
            const response = await fetch(`http://localhost:3000/api/getPlaceDetail?code=${placeCode}`);

            const data = await response.json()
            console.log("Fetching Place Detail Successfully :", data);
            return data
        }catch (error) {
            console.error("Error in fetchPlaceDetail :", error);
            throw error;
        }
    }

)