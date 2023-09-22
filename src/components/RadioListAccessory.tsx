import {RadioContentDto} from "@/sources/dto/RadioContentDto";
import {GoIcon} from "@/sources/icons";
import {RadioItemDto} from "@/sources/dto/RadioItemDto";
import {UseAppSelector} from "@/redux/hooks";

export default function RadioListAccessory({contents, items}: {
    contents: RadioContentDto;
    items: RadioItemDto; //
}) {
    const {
        isDarkMode,
    } = UseAppSelector((state) => state.states);
    return(<>

        {contents?.title?.toLowerCase().startsWith("cities") || contents?.title?.toLowerCase().startsWith("places") ?
            <button className={"flex justify-between items-center"} type="button" >
                <a className={"block px-4 p-2 text-blue-600 "}>
                    {items.leftAccessoryCount}
                </a>
                <GoIcon iconColor={`${isDarkMode ? "#e0dfdc" : "#09244B"}`} />
            </button>: ""
        }
        {contents?.title?.toLowerCase().startsWith("nearby") ?
            <button className={"flex justify-between items-center"} type="button" >
                <a className={"block px-4 py-2 text-cyan-900"}>
                    {items.rightDetail}
                </a>
                <GoIcon iconColor={`${isDarkMode ? "#e0dfdc" : "#09244B"}`} />
            </button>: ""
        }
        {items?.title?.toLowerCase().startsWith("view all") || items?.title?.toLowerCase().startsWith("go to") ?
            <button className={"flex justify-between items-center"} type="button" >
                <GoIcon iconColor={`${isDarkMode ? "#e0dfdc" : "#09244B"}`} />
            </button> : ""
        }

    </>)
}