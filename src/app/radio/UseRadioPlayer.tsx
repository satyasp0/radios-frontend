"use client"
import {PrevIcon, NextIcon, StopIcon, PlayIcon, LoadingIcon} from "@/sources/icons"
import {useRef} from "react";
import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {setRadioIsLoading} from "@/redux/slices/nowPlayingSlices";
import {setRadioIsPlaying} from "@/redux/slices/statesSlices";
import RadioList from "@/components/RadioList";

export default function useRadioPlayer(){

    const dispatch = UseAppDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const {
        place: { title: radioRegion },
        country: { title: countryTitle },
        title: radioName,
        id: radioID,
        isLoading:radioIsLoading,

    } = UseAppSelector((state) => state.nowPlaying);

    const {
        isPlaying:radioIsPlaying,
    } = UseAppSelector((state) => state.states)

    const radioLocation = `${radioRegion}, ${countryTitle}`;


    const handlePlayerClick = () =>{
        dispatch(setRadioIsPlaying(!radioIsPlaying))
    }

    let iconToDisplay;
    if (radioIsLoading) {
        iconToDisplay = <LoadingIcon />;
    } else {
        iconToDisplay = radioIsPlaying ? <StopIcon /> : <PlayIcon />;
    }



    return (

            <div className="z-10 w-full rounded-xl shadow-xl">
                <audio
                    ref={audioRef}
                    src={`https://radio.garden/api/ara/content/listen/${radioID}/channel.mp3`}
                    onCanPlay={() => {
                        if (!radioIsPlaying) {
                            audioRef.current?.play();
                            dispatch(setRadioIsLoading(false))
                            dispatch(setRadioIsPlaying(true))
                        }
                    }}
                    muted={!radioIsPlaying}
                />

                <RadioList/>

                <div
                    className="bg-white/70 border-slate-100/50 transition-all duration-500 dark:bg-slate-800/70 dark:border-slate-500/50 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
                    <div className="flex justify-center items-center space-x-4">
                        <div className="min-w-0 space-y-1 font-semibold">
                            <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                                {radioLocation}
                            </h2>
                            <p className="text-slate-900 dark:text-slate-50 text-lg">
                                {radioName}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-slate-50/80 text-slate-500 transition-all duration-500 dark:bg-slate-600/70 dark:text-slate-200/50 rounded-b-xl flex items-center">
                    <div className="flex-auto hover:animate-float-and-wiggle flex items-center justify-evenly">
                        <button type="button" aria-label="Previous">
                          <PrevIcon/>
                        </button>
                    </div>
                    <button
                        onClick={handlePlayerClick}
                        type="button"
                        className={`bg-white/90 text-slate-900 ${ radioIsPlaying ? 'transform-none' : 'transform rotate-90'} 
                        transition-transform duration-300 dark:bg-slate-100/80 dark:text-slate-700 flex-none
                        -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center
                        p-7 md:px-6`}
                        aria-label="Pause">

                        {iconToDisplay}

                    </button>

                    <div className="flex-auto hover:animate-float-and-wiggle flex items-center justify-evenly">
                        <button type="button" aria-label="Next">
                            <NextIcon/>
                        </button>
                    </div>
                </div>
            </div>
    )
}