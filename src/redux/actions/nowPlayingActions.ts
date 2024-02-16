import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchNowPlaying = createAsyncThunk(
    "nowPlaying/fetchNowPlaying",
    async (channelCode: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/getChannelDetail?code=${channelCode}`);
            const data = await response.json();
            console.log("Fetch successful:", data);
            return data;
        } catch (error) {
            console.error("Error in fetchNowPlaying:", error);
            throw error;
        }
    }
);