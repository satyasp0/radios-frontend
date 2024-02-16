import {createSlice} from "@reduxjs/toolkit";
import {PlaceDetailDto} from "@/sources/dto/PlaceDetailDto";
import {fetchPlaceDetail} from "@/redux/actions/placeDetailActions";

const initialState: PlaceDetailDto = {
    isError: false,
    isLoading: false,
    type: "channel",
    map: "1lHyt385",
    title: "Bandung",
    subtitle: "Indonesia",
    url: "/visit/bandung/1lHyt385",
    content: [
        {
            items: [
                {
                    href: "/listen/maestro-radio-92-5-fm/pObZ1Z04",
                    title: "Maestro Radio 92.5 FM",
                    page:{
                        map:"0UJszJAv",
                        url:"/visit/subang/0UJszJAv",
                        type:"page",
                        count:3,
                        title:"Subang",
                        subtitle:"Indonesia"
                    }
                },
                {
                    href: "/listen/maestro-radio-92-5-fm/pObZ1Z04",
                    title: "Maestro Radio 92.5 FM",
                    page:{
                        map:"0UJszJAv",
                        url:"/visit/subang/0UJszJAv",
                        type:"page",
                        count:3,
                        title:"Subang",
                        subtitle:"Indonesia"
                    }
                },
            ],
            itemsType: "channel",
            title: "Stations in Bandung",
            type: "list",
        },
    ],
};

export const placeDetailSlice = createSlice({
    name: "placeDetail",
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchPlaceDetail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchPlaceDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.type = action.payload.data?.data?.type;
                state.map = action.payload.data?.data?.map;
                state.title = action.payload.data?.data?.title;
                state.subtitle = action.payload.data?.data?.subtitle;
                state.url = action.payload.data?.data?.url;
                state.content = action.payload.data?.data?.content ?? [];
            })
            .addCase(fetchPlaceDetail.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export default placeDetailSlice.reducer