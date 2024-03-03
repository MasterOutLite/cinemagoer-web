import {SelectEnum} from "./select-enum";

export enum VideoTypeEnum {
  Movie = "Movie",
  Serial = "Serial",
  OVA = "OVA",
  ShortMovie = "ShortMovie",
  SpecialEpisode = "SpecialEpisode",
}

export const videoTypeArr: SelectEnum[] = [
  {key: VideoTypeEnum.Movie, value: 'Фільм'},
  {key: VideoTypeEnum.Serial, value: 'Серіал'},
  {key: VideoTypeEnum.OVA, value: 'ОВА'},
  {key: VideoTypeEnum.ShortMovie, value: 'Короткометражний фільм'},
  {key: VideoTypeEnum.SpecialEpisode, value: 'Спеціальний епізод'},
]

export const videoTypes: { [key: string]: string } = {
  [VideoTypeEnum.Movie]: 'Фільм',
  [VideoTypeEnum.Serial]: 'Серіал',
  [VideoTypeEnum.OVA]: 'ОВА',
  [VideoTypeEnum.ShortMovie]: 'Короткометражний фільм',
  [VideoTypeEnum.SpecialEpisode]: 'Спеціальний епізод',
}
