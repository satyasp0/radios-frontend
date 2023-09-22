import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {useEffect, useRef} from "react";
import {fetchNowPlaying} from "@/redux/actions/nowPlayingActions";
import {setRadioIsLoading} from "@/redux/slices/nowPlayingSlices";
import {setIsHidden, setRadioIsPlaying} from "@/redux/slices/statesSlices";
import {fetchPlaceDetail} from "@/redux/actions/placeDetailActions";
import RadioPlaceList from "@/components/RadioPlaceList";

export default function RadioList(){
    const dispatch = UseAppDispatch();
    const scrollerRef = useRef<HTMLDivElement>(null);


    const {
        isHidden:hider,
        isAllPlaceChannels,
    } = UseAppSelector((state) => state.states)

    const {
        content:PlaceChannelsContent,
    } = UseAppSelector((state) => state.allPlaceChannelsSlice)

    const {
        content:placeDetailContent,
    } = UseAppSelector((state) => state.placeDetail)


    const handleHider = () => {
        dispatch(setIsHidden(!hider));
        if (!hider && scrollerRef.current) {
            scrollerRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        dispatch(fetchNowPlaying("_PBsjNLL"));
        dispatch(fetchPlaceDetail("1lHyt385"))
        dispatch(setRadioIsLoading(false))
        dispatch(setRadioIsPlaying(false))
    }, [dispatch]);
    return(<>
        <div className={`element ${hider ? '' : 'visible'} 
                       bg-white/70 border-slate-100/50 dark:bg-slate-800/70 dark:border-slate-500/50
                       border-b rounded-xl w-full p-4 pb-8 sm:p-6 sm:pb-8 lg:px-4 xl:px-6 lg:pt-5 xl:pb-10`}
             ref={scrollerRef}>

            {isAllPlaceChannels ? <RadioPlaceList contents={PlaceChannelsContent}/> : <RadioPlaceList contents={placeDetailContent}/>}
        </div>
        <button
            onClick={handleHider}
            className="mb-4 mt-1 w-full text-white bg-blue-700/50 hover:bg-blue-600/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex justify-between items-center dark:bg-blue-600/70 dark:hover:bg-blue-700/70"
            type="button"
        >
            Radio List
            <svg
                className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                    hider ? "rotate-0" : "rotate-180"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                />
            </svg>
        </button>
    </>)
}