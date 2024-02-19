import {createAsyncThunk} from "@reduxjs/toolkit";
import {radioDefaultHost} from "../../../config";

export const fetchNowPlaying = createAsyncThunk(
    "nowPlaying/fetchNowPlaying",
    async (param:BasePayloadCreatorDto) => {
        try {
            const host = param.hostName ?? radioDefaultHost;
            const response = await fetch(host+`/api/getChannelDetail?code=${param.code}`);
            const data = await response.json();
            console.log("Fetch successful:", data);
            return data;
        } catch (error) {
            console.error("Error in fetchNowPlaying:", error);
            throw error;
        }
    }
);