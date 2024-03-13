import {RadioContentDto} from "@/sources/dto/RadioContentDto";
import RadioListAccessory from "@/components/RadioListAccessory";
import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {
    setIsAllPlaceChannels,
    setNextPlayingId,
    setNowPlayingId,
    setPreviousPlayingId,
    setRadioIsPlaying
} from "@/redux/slices/statesSlices";
import {fetchNowPlaying} from "@/redux/actions/nowPlayingActions";
import {fetchPlaceChannels} from "@/redux/actions/allPlaceChannelsAction";
import {fetchPlaceDetail} from "@/redux/actions/placeDetailActions";
import React, {useEffect} from "react";
import {getRealID} from "@/utils/getRealId";
import {getHost} from "@/utils/getHost";

export default function RadioPlaceList({contents, scrollRef, audioRef}: Readonly<{ contents: ReadonlyArray<RadioContentDto> | undefined; scrollRef: HTMLDivElement | null; audioRef:React.RefObject<HTMLAudioElement>|null}>): React.JSX.Element {
    const dispatch = UseAppDispatch();

    const {
        isAllPlaceChannels,
        nowPlayingId,
    } = UseAppSelector((state) => state.states)

    const {
        title: radioName,
        url:radioUrl,
    } = UseAppSelector((state) => state.nowPlaying);

    const {
        title:placeTitle,
        subtitle:placeSubtitle,
    } = UseAppSelector(state => state.allPlaceChannelsSlice)

    const handleLiClick = (id : string) => {
        dispatch(setNowPlayingId(id));
        if(id==radioUrl){
            return;
        }else if(id.startsWith("/listen")){
            dispatch(setRadioIsPlaying(false));
            dispatch(fetchNowPlaying({code: getRealID(id,1), hostName:getHost()}));
            findNextAndPrevId();
        }else if (id.startsWith("/visit") && id.endsWith("channels")){
            dispatch(fetchPlaceChannels({code: getRealID(id,2), hostName:getHost()}));
            dispatch(setIsAllPlaceChannels(true));
            findNextAndPrevId()
        }else if (id.startsWith("/visit")){
            dispatch(fetchPlaceDetail({code:getRealID(id,1),hostName:getHost()}));
            scrollToTop();
        }else {
            dispatch(setRadioIsPlaying(false));
            dispatch(fetchNowPlaying({code:id, hostName:getHost()}));
            dispatch(fetchPlaceDetail({code:"1lHyt385", hostName:getHost()}));
        }
    };

    useEffect(() => {
        findNextAndPrevId()
    }, [nowPlayingId]);

    const findNextAndPrevId = () => {
        if (!nowPlayingId || !scrollRef || !scrollRef.children) {
            return null;
        }
        const divElement = Array.from(scrollRef.children).filter(
            (child) => child.tagName.toLowerCase() === 'div'
        );
        const ulElements = divElement
            .map((divElement) => Array.from(divElement.children))
            .flat()
            .filter((child) => child.tagName.toLowerCase() === 'ul');

        finderLoop(ulElements)
    };

    const finderLoop = (ulElements: Element[]) => {
        for (const element of ulElements) {
            const liElements = element.querySelectorAll('li');

            for (let j = 0; j < liElements.length; j++) {
                const liElement = liElements[j];
                const dataId = liElement.getAttribute('data-id');

                if (dataId === nowPlayingId) {
                    const nextIndex = j + 1;
                    const prevIndex = j - 1;

                    if (nextIndex < liElements.length) {
                        dispatch(setNextPlayingId(liElements[nextIndex].getAttribute('data-id')));
                    }

                    if (prevIndex >= 0) {
                        dispatch(setPreviousPlayingId(liElements[prevIndex].getAttribute('data-id')));
                    }
                }
            }
        }
    }

    const scrollToTop= () => {
        scrollRef?.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const PlaceHeader = `${placeTitle}, ${placeSubtitle}`;
    return(<>
        {!isAllPlaceChannels && contents?.map((contents) => (<>
                <div className="px-4 border-b-2 border-gray-700/50 dark:border-gray-200/50 pb-1 text-sm font-extrabold text-slate-100 dark:text-white">
                     {isAllPlaceChannels?  PlaceHeader : contents.title}
                </div>

                <ul className="py-2 text-sm text-slate-50/50 dark:text-gray-200 rounded-lg cursor-pointer">
                    {contents?.items?.map((items) => (
                        <li className={`${items.title === radioName ? "text-blue-600 bg-slate-100/20 dark:text-blue-400 cursor-not-allowed"  : ""} my-1 flex rounded-2xl justify-between hover:bg-slate-100/10 items-center content-center`}
                            key={items.title}
                            data-id={items.href}
                            onClick={() => handleLiClick((items?.href ?? items.page?.url) ?? "")}>
                            <button className="block text-left px-4 py-2" type="button">
                                {items.title}
                                {contents?.title?.toLowerCase().startsWith("popular") || contents?.title?.toLowerCase().startsWith("picks from") ?
                                    <p className={"text-gray-500 text-xs"}>{items?.subtitle}</p> : ""
                                }
                            </button>
                            <RadioListAccessory contents={contents} items={items} />
                        </li>
                    ))}
                </ul>
            </>))
        }

        {isAllPlaceChannels && contents?.map((contents) => (<>
            <div className="px-4 border-b-2 border-gray-700/50 dark:border-gray-200/50 pb-1 text-sm font-extrabold text-slate-100 dark:text-white">
                {isAllPlaceChannels?  PlaceHeader : contents.title}
            </div>

            <ul className="py-2 text-sm text-slate-50/50 dark:text-gray-200 rounded-lg cursor-pointer">
                {contents?.items?.map((items) => (
                    <li className={`${items.page?.title === radioName ? "text-blue-600 dark:bg-gray-600 bg-slate-100/20 dark:text-blue-400 cursor-not-allowed"  : ""} my-1 flex rounded-2xl justify-between hover:bg-slate-100/10  items-center content-center`}
                        key={items.page?.title}
                        data-id={items.page?.url}
                        onClick={() => handleLiClick((items?.page?.url  ?? items.page?.url) ?? "")}>
                        <button className="block px-4 py-2" type="button">
                            {items.page?.title}
                            {contents?.title?.toLowerCase().startsWith("popular") || contents?.title?.toLowerCase().startsWith("picks from") ?
                                <p className={"text-gray-500 text-xs"}>{items.page?.subtitle}</p> : ""
                            }
                        </button>
                        <RadioListAccessory contents={contents} items={items} />
                    </li>
                ))}
            </ul>
        </>))}
    </>)
}