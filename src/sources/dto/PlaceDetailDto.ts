import {RadioContentDto} from "@/sources/dto/RadioContentDto";

export class PlaceDetailDto{
    isError?: boolean;
    isLoading?: boolean;
    type?:string
    map?:string
    title?:string
    subtitle?:string
    url?:string
    count?:number
    content?:RadioContentDto[]
}