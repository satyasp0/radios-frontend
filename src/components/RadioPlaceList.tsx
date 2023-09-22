import {RadioContentDto} from "@/sources/dto/RadioContentDto";
import RadioListAccessory from "@/components/RadioListAccessory";
import {UseAppDispatch, UseAppSelector} from "@/redux/hooks";
import {setIsAllPlaceChannels, setRadioIsPlaying} from "@/redux/slices/statesSlices";
import {fetchNowPlaying} from "@/redux/actions/nowPlayingActions";
import {fetchPlaceChannels} from "@/redux/actions/allPlaceChannelsAction";
import {fetchPlaceDetail} from "@/redux/actions/placeDetailActions";

export default function RadioPlaceList({contents, scrollRef}: {
    contents: RadioContentDto[] | undefined;
    scrollRef:HTMLDivElement | null;
    }) {
    const dispatch = UseAppDispatch();

    const {
        isAllPlaceChannels
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
        if(id==radioUrl){
            return;
        }else if(id.startsWith("/listen")){
            dispatch(setRadioIsPlaying(false));
            dispatch(fetchNowPlaying(getRealID(id,1)));
        }else if (id.startsWith("/visit") && id.endsWith("channels")){
            dispatch(fetchPlaceChannels(getRealID(id,2)))
            dispatch(setIsAllPlaceChannels(true))
        }else if (id.startsWith("/visit")){
            dispatch(fetchPlaceDetail(getRealID(id,1)))
            scrollToTop()
        }else {
            dispatch(setRadioIsPlaying(false));
            dispatch(fetchNowPlaying(id));
            dispatch(fetchPlaceDetail("1lHyt385"))
        }
    };

    const scrollToTop= () => {
        scrollRef?.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const getRealID = (urls:string, part:number) => {
        const parts = urls.split('/');
        return parts[parts.length - part];
    }

    const PlaceHeader = `${placeTitle}, ${placeSubtitle}`;
    return(<>


            {contents?.map((contents) => (<>
                <div className="px-4 border-b-2 border-gray-700/50 dark:border-gray-200/50 pb-1 text-sm font-extrabold text-gray-900 dark:text-white">
                     {isAllPlaceChannels?  PlaceHeader : contents.title}
                </div>

                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg cursor-pointer">
                    {contents?.items?.map((items) => (<>
                        <li className={`${items.title === radioName ? "text-blue-600 dark:bg-gray-600 bg-gray-100/50 dark:text-blue-400 hover:dark:text-blue-300 cursor-not-allowed"  : ""} flex rounded-2xl justify-between hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white items-center content-center`}
                            key={items.title}
                            onClick={() => handleLiClick((items?.href ?? items.page?.url) ?? "")}>
                            <a className="block px-4 py-2">
                                {items.title}
                                {contents?.title?.toLowerCase().startsWith("popular") || contents?.title?.toLowerCase().startsWith("picks from") ?
                                    <p className={"text-gray-500 text-xs"}>{items?.subtitle}</p> : ""
                                }
                            </a>
                            <RadioListAccessory contents={contents} items={items} />
                        </li>
                    </>))}
                </ul>

            </>))
            }
    </>)
}