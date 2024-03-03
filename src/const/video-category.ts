import {SelectEnum} from "./select-enum";

export enum VideoCategory{
  Movie = 'movie',
  Serial = 'serial',
  Cartoon = 'cartoon',
  Anime = 'anime'
}

export const videoCategoryArr: SelectEnum[]=[
  {key: VideoCategory.Movie, value: 'Фільм'},
  {key: VideoCategory.Serial, value: 'Серіал'},
  {key: VideoCategory.Cartoon, value: 'Мультфільм'},
  {key: VideoCategory.Anime, value: 'Аніме'},
]
