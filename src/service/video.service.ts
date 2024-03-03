import {sendRequest, VideoCategory} from "../helper/api";
import {VideoDetail} from "../type/video-detail";
import {VideoType} from "../type/videoType";
import {Series} from "../type/series";
import {SeasonOfYear} from "../const/season-of-year";
import {VideoStatus} from "../const/video-status";
import queryString from "query-string";

export type FilterVideo = {
  page?: number,
  limit?: number,
  genreIds?: number[],
  type?: VideoType,
  seasonOfYear?: SeasonOfYear,
  status?: VideoStatus,
  ageRatingId?: number,
  videoCategory?: VideoCategory,
  dateReleaseMin?: string,
  dateReleaseMax?: string,
}

class VideoService {
  async getVideoDetails(id: number) {
    const url = `video?id=${id}`
    const date = await sendRequest(url);
    return date as VideoDetail;
  }

  async getVideoByFilter(queryObg: FilterVideo) {
    queryObg.page = queryObg.page || 0;
    console.log('VideoService', 'getVideoByFilter:', queryObg)
    const query = queryString.stringify(queryObg, {arrayFormat: 'comma', skipNull: true, skipEmptyString: true})
    const url = `video/filter?${query}`;
    const date = await sendRequest(url,)
    return date as {
      rows: VideoType[],
      page: number,
      count: number
    };
  }

  async getVideoByName(name: string, videoCategory: VideoCategory, page: number = 0, limit: number = 20) {
    const url = `video/searchByName` +
      `?page=${page}&name=${name}&videoCategory=${videoCategory}&limit=${limit}`
    const date = await sendRequest(url);
    return date as {
      rows: VideoType[],
      page: number,
      count: number
    };
  }

  async getVideoByDayOfWeek() {
    const url = `video-series/seriesOfDay`;
    const date = await sendRequest(url);
    return date as [Series[]];
  }
}

export default new VideoService()
