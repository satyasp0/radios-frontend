"use client"
import {PrevIcon, NextIcon, StopIcon, PlayIcon, LoadingIcon} from "@/sources/icons"
import {useEffect, useRef} from "react";
import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {setRadioIsLoading} from "@/redux/slices/nowPlayingSlices";
import {setNowPlayingId, setRadioIsPlaying} from "@/redux/slices/statesSlices";
import RadioList from "@/components/RadioList";
import {fetchNowPlaying} from "@/redux/actions/nowPlayingActions";
import {getRealID} from "@/utils/getRealId";
import {fetchPlaceDetail} from "@/redux/actions/placeDetailActions";
import {getRGBValues} from "@/utils/rgbToHex";
import ColorPickerComponent from "@/components/ColorPicker";
import {getHost} from "@/utils/getHost";
import {setPlayer} from "@/utils/setPlayer";

export default function useRadioPlayer() {

    const dispatch = UseAppDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const {
        nextPlayingId,
        previousPlayingId,
    } = UseAppSelector((state) => state.states)

    const {
        place: {title: radioRegion},
        country: {title: countryTitle},
        title: radioName,
        id: radioID,
        isLoading: radioIsLoading,
        isGetComplete,
    } = UseAppSelector((state) => state.nowPlaying);

    const {
        isPlaying: radioIsPlaying,
        secondaryColor,
    } = UseAppSelector((state) => state.states)

    const radioLocation = `${radioRegion}, ${countryTitle}`;


    const handlePlayerClick = () => {
        dispatch(setRadioIsPlaying(!radioIsPlaying))
        setPlayer(radioIsPlaying,audioRef, dispatch);
    }

    let iconToDisplay;
    if (radioIsLoading) {
        iconToDisplay = <LoadingIcon/>;
    } else {
        iconToDisplay = radioIsPlaying ? <StopIcon/> : <PlayIcon/>;
    }

    const handleNexClick = (id: string) => {
        dispatch(setRadioIsPlaying(false));
        dispatch(fetchNowPlaying({code: getRealID(id, 1), hostName: getHost()}));
        dispatch(setNowPlayingId(id));
    }

    useEffect(() => {
        dispatch(fetchNowPlaying({code: "_PBsjNLL", hostName: getHost()}));
        dispatch(fetchPlaceDetail({code: "1lHyt385", hostName: getHost()}))
        dispatch(setRadioIsLoading(false))
        dispatch(setRadioIsPlaying(false))
    }, [dispatch]);

    return (

        (isGetComplete &&
            <div className="z-10 w-full rounded-xl shadow-xl">
                <audio
                    ref={audioRef}
                    src={`https://radio.garden/api/ara/content/listen/${radioID}/channel.mp3`}
                    muted={!radioIsPlaying}
                />

                <RadioList audioRef={audioRef}/>

                <div
                    style={{backgroundColor: getRGBValues(secondaryColor)}}
                    className="backdrop-blur-sm transition-all duration-500 dark:bg-slate-800/70 rounded-t-xl p-4 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:py-4">
                    <ColorPickerComponent/>
                    <div className="flex justify-center items-center space-x-4">
                        <div className="min-w-0 space-y-1 font-semibold text-center">
                            <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                                {radioLocation}
                            </h2>
                            <p className="text-white/40 dark:text-slate-50 text-lg">
                                {radioName}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{backgroundColor: getRGBValues(secondaryColor)}}
                    className="backdrop-blur-sm text-slate-500 transition-all duration-500 dark:bg-slate-600/70 dark:text-slate-200/50 rounded-b-xl flex items-center">
                    <div onClick={() => previousPlayingId && handleNexClick(previousPlayingId)}
                         className="flex-auto hover:animate-float-and-wiggle flex items-center justify-evenly">
                        <button type="button" aria-label="Previous">
                            <PrevIcon/>
                        </button>
                    </div>
                    <button
                        onClick={handlePlayerClick}
                        type="button"
                        className={`bg-white/10 ${radioIsPlaying ? 'transform rotate-180' : 'transform-none'} 
                        transition-transform duration-300 dark:bg-slate-100/80 dark:text-slate-700 flex-none
                        mb-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center
                        p-7 md:px-6`}
                        aria-label="Pause">

                        {iconToDisplay}

                    </button>

                    <div onClick={() => nextPlayingId && handleNexClick(nextPlayingId)}
                         className="flex-auto hover:animate-float-and-wiggle flex items-center justify-evenly">
                        <button type="button" aria-label="Next">
                            <NextIcon/>
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}