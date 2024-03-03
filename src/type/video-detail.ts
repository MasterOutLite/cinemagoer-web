import {VideoType} from "./videoType";
import {VideoInfoType} from "./video-info-type";
import {Series} from "./series";


export type VideoDetail = {
    video: VideoType;
    videoInfo: VideoInfoType;
    season?: any[];
    series?: Series[];
}
