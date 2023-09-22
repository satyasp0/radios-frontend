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
                if(action.payload.status === 200){
                    state.type = action.payload.data?.type;
                    state.map = action.payload.data?.map;
                    state.title = action.payload.data?.title;
                    state.subtitle = action.payload.data?.subtitle;
                    state.url = action.payload.data?.url;
                    state.count = action.payload.data?.count;
                    state.content = action.payload.data?.content ?? [];
                }else {
                    state.isError = true
                }
            })
            .addCase(fetchPlaceChannels.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export default allPlaceChannelsSlice.reducer