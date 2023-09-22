import {createSlice} from "@reduxjs/toolkit";
import {fetchNowPlaying} from "@/redux/actions/nowPlayingActions";
import {NowPlayingDto} from "@/sources/dto/NowPlayingDto";


const initialState: NowPlayingDto = {
    isError: false,
    isLoading: false,
    type: "Channel",
    title: "DArdan FM 105.9",
    id: "_PBsjNLL",
    url: "Channel URL",
    website: "Channel Website",
    secure: true,
    place: {
        id: "place id",
        title: "DBandung",
    },
    country: {
        id: "place id",
        title: "DIndonesia",
    },
};



export const nowPlayingSlice = createSlice({
    name: "nowPlaying",
    initialState,
    reducers: {
        setRadioIsLoading:(state,action) => {
            state.isLoading = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNowPlaying.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchNowPlaying.fulfilled, (state, action) => {
                state.isError = false;
                // state.isLoading = false
                state.type = action.payload.data?.type
                state.title = action.payload.data?.title
                state.id = action.payload.data?.id
                state.url= action.payload.data?.url
                state.website = action.payload.data?.website
                state.place.id = action.payload.data?.place?.id
                state.place.title = action.payload.data?.place?.title
                state.country.id = action.payload.data?.country?.id
                state.country.title = action.payload.data?.country?.title
            })
            .addCase(fetchNowPlaying.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const {
    setRadioIsLoading,
} = nowPlayingSlice.actions;

export default nowPlayingSlice.reducer;
