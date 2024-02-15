import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {useEffect, useRef, useState} from "react";
import {setIsAllPlaceChannels, setIsHidden} from "@/redux/slices/statesSlices";
import RadioPlaceList from "@/components/RadioPlaceList";
import {GoIcon} from "@/sources/icons";

export default function RadioList(){
    const dispatch = UseAppDispatch();
    const [transitionStage, setTransitionStage] = useState<"active-left" | "active-middle" | "active-right">("active-left");
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
        title,
        subtitle
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
        if (isAllPlaceChannels) {
            if (transitionStage === "active-left") {
                setTransitionStage("active-middle");
                setTimeout(() => {
                    setTransitionStage("active-right");
                }, 200);
            }
        } else if (transitionStage === "active-right") {
            setTransitionStage("active-middle");
            setTimeout(() => {
                setTransitionStage("active-left");
            }, 200);
        }
    }, [isAllPlaceChannels]);

    return(
        <>
            <div className="w-full p-4 px-9 backdrop-blur-sm bg-blue-700/25 text-center border-2 border-amber-400/20 rounded-t-xl text-sm font-semibold text-white dark:text-white">
                {isAllPlaceChannels && (
                    <button className="rotate-180 floating-element hover:bg-slate-400 bg-slate-50/50 rounded-lg" onClick={() => dispatch(setIsAllPlaceChannels(false))}>
                        <GoIcon iconColor="#000000"/>
                    </button>
                )}
                {title}, {subtitle}
            </div>
            <div className={`element ${hider ? '' : 'visible rounded-b-xl'} 
                           backdrop-blur-sm bg-slate-100/20 border-slate-100/50 dark:bg-slate-800/70 dark:border-slate-500/50
                           border-b  w-full p-4 pb-8 sm:p-6 sm:pb-8 lg:px-4 xl:px-6 lg:pt-5 xl:pb-10`}
                 ref={scrollerRef}>

                <div className={`${transitionStage}`}>
                    {isAllPlaceChannels ? (
                        <RadioPlaceList
                            contents={PlaceChannelsContent}
                            scrollRef={scrollerRef.current}
                        />
                    ) : (
                        <RadioPlaceList
                            contents={placeDetailContent}
                            scrollRef={scrollerRef.current}
                        />
                    )}
                </div>
            </div>
            <button
                onClick={handleHider}
                className={`backdrop-blur-sm bg-blue-700/25 mb-4 w-full text-white hover:bg-blue-700/20 font-medium 
                          ${hider ? "rounded-b-lg" : "rounded-lg" } mt-1 text-sm px-10 py-2.5 text-center inline-flex justify-between items-center dark:bg-blue-600/70 dark:hover:bg-blue-700/70`}
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
        </>
    )
}