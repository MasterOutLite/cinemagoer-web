import {VideoType} from "./videoType";

export interface Series {
    id: number;
    videoId: number;
    dayOfWeek: number;
    series: number;
    name: string;
    dateRelease: string;
    release: boolean;
    seasonId: number;
    video: VideoType;
}
