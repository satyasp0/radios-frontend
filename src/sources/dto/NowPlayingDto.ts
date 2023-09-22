import {RegionDto} from "@/sources/dto/RegionDto";

export class NowPlayingDto  {
    isError?: boolean;
    isLoading?: boolean;
    type?: string;
    title!: string;
    id!: string;
    url?: string;
    website?: string;
    secure?: boolean;
    place!: RegionDto;
    country!: RegionDto;
}