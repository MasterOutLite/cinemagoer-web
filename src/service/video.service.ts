import {SeasonOfYear} from "const/season-of-year";
import {VideoCategory} from "const/video-category";
import {VideoStatus} from "const/video-status";
import queryString from "query-string";
import {Series} from "type/series";
import {VideoDetail} from "type/video-detail";
import {VideoType} from "type/videoType";
import ApiService from "./api.service";

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

  async create(form: FormData) {
    return await ApiService.postWithFile('/video', form);
  }

  async createSeries(videoId: number, series: []) {
    return await ApiService.post('/video-series', {videoId, series})
  }

  async getVideoDetails(id: number) {
    const url = `/video?id=${id}`
    const date = await ApiService.get(url) as VideoDetail;
    console.log(date);
    return date;
  }

  async getVideoByFilter(queryObg: FilterVideo) {
    queryObg.page = queryObg.page || 0;
    console.log('VideoService', 'getVideoByFilter:', queryObg)
    const query = queryString.stringify(queryObg, {arrayFormat: 'comma', skipNull: true, skipEmptyString: true})
    const url = `/video/filter?${query}`;
    return await ApiService.get(url) as {
      rows: VideoType[],
      page: number,
      count: number
    } || {rows: [], count: 0, page: 0}
  }

  async getVideoByName(name: string, videoCategory: VideoCategory, page: number = 0, limit: number = 20) {
    const url = `/video/searchByName?`
    const query = queryString.stringify({page, name, videoCategory, limit}, {
      arrayFormat: 'comma',
      skipNull: true,
      skipEmptyString: true
    })
    return await ApiService.get(url + query) as {
      rows: VideoType[],
      page: number,
      count: number
    }
  }

  async getVideoByDayOfWeek() {
    const url = `/video-series/seriesOfDay`;
    return await ApiService.get(url) as [Series[]] || [];
  }

  async updateVideo(form: FormData, id: number) {
    return await ApiService.putWithFile(`/video/${id}`, form);
  }
}

export default new VideoService()
