import {createAsyncThunk} from "@reduxjs/toolkit";
import {radioDefaultEndpoint} from "../../../config";

export const fetchNowPlaying = createAsyncThunk(
    "nowPlaying/fetchNowPlaying",
    async (channelCode: string) => {
        try {
            const response = await fetch(
                radioDefaultEndpoint+`/channel/${channelCode}`
            );
            const data = await response.json();
            console.log("Fetch successful:", data);
            return data;
        } catch (error) {
            console.error("Error in fetchNowPlaying:", error);
            throw error;
        }
    }
);