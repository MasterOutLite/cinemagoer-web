import {SelectEnum} from "./select-enum";

export enum VideoStatus {
  Announced = 'Announced',
  ItComesOut = 'ItComesOut',
  ItWorkedOut = 'ItWorkedOut',
  Abandoned = 'Abandoned'
}

export const videoStatusArr: SelectEnum[] = [
  {key: VideoStatus.Announced, value: 'Анонсовано'},
  {key: VideoStatus.ItComesOut, value: 'Виходить'},
  {key: VideoStatus.ItWorkedOut, value: 'Вийшло'},
  {key: VideoStatus.Abandoned, value: 'Закинуте'},
]

export const videoStatus: { [key: string]: string } = {
  [VideoStatus.Announced]: 'Анонсовано',
  [VideoStatus.ItComesOut]: 'Виходить',
  [VideoStatus.ItWorkedOut]: 'Вийшло',
  [VideoStatus.Abandoned]: 'Закинуте',
}

