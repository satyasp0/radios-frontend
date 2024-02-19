import {PlaceDetailDto} from "@/sources/dto/PlaceDetailDto";
import {createSlice} from "@reduxjs/toolkit";
import {fetchPlaceChannels} from "@/redux/actions/allPlaceChannelsAction";

const initialState: PlaceDetailDto = {
    type: "page",
    count: 46,
    map: "1lHyt385",
    title: "Bandung",
    subtitle: "All Stations",
    url: "/visit/bandung/1lHyt385/channels"
}

export const allPlaceChannelsSlice = createSlice({
    name:"allPlaceChannels",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchPlaceChannels.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchPlaceChannels.fulfilled, (state, action) => {
                state.isLoading = false
                state.type = action.payload.data?.data?.type;
                state.map = action.payload.data?.data?.map;
                state.title = action.payload.data?.data?.title;
                state.subtitle = action.payload.data?.data?.subtitle;
                state.url = action.payload.data?.data?.url;
                state.count = action.payload.data?.data?.count;
                state.content = action.payload.data?.data?.content ?? [];
            })
            .addCase(fetchPlaceChannels.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export default allPlaceChannelsSlice.reducer