import {setRadioIsLoading} from "@/redux/slices/nowPlayingSlices";
import {setRadioIsPlaying} from "@/redux/slices/statesSlices";
import {Dispatch} from "redux";

export function setPlayer (radioIsPlaying:boolean|undefined,audioRef:React.RefObject<HTMLAudioElement>|null,dispatch: Dispatch) {
    if (!radioIsPlaying) {
        const playPromise = audioRef?.current?.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    dispatch(setRadioIsLoading(false));
                    dispatch(setRadioIsPlaying(true));
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        }
    }
}
