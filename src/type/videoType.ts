import {BaseResponse} from "./base-response";

export type VideoType = {
    id: number;
    rate: number | null;
    yourRate: number | null;
    name: string[];
    dateRelease: string;
    genre: BaseResponse[];
    type: string;
    status: string;
    videoCategory: string;
    publisher: BaseResponse;
    ageRating: BaseResponse;
    icon: string;
}
