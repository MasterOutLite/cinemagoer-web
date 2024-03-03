import {SelectEnum} from "./select-enum";

export enum VideoType {
  Movie = "Movie",
  Serial = "Serial",
  OVA = "OVA",
  ShortMovie = "ShortMovie",
  SpecialEpisode = "SpecialEpisode",
}

export const videoTypeArr: SelectEnum[] = [
  {key: VideoType.Movie, value: 'Фільм'},
  {key: VideoType.Serial, value: 'Серіал'},
  {key: VideoType.OVA, value: 'ОВА'},
  {key: VideoType.ShortMovie, value: 'Короткометражний фільм'},
  {key: VideoType.SpecialEpisode, value: 'Спеціальний епізод'},
]

export const videoTypes: { [key: string]: string } = {
  [VideoType.Movie]: 'Фільм',
  [VideoType.Serial]: 'Серіал',
  [VideoType.OVA]: 'ОВА',
  [VideoType.ShortMovie]: 'Короткометражний фільм',
  [VideoType.SpecialEpisode]: 'Спеціальний епізод',
}
