import {SelectEnum} from "./select-enum";

export enum SeasonOfYear {
  Winter = 'winter',
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall'
}

export const seasonOfYearArr: SelectEnum[] = [
  {key: SeasonOfYear.Winter, value: 'Зима'},
  {key: SeasonOfYear.Spring, value: 'Весна'},
  {key: SeasonOfYear.Summer, value: 'Літо'},
  {key: SeasonOfYear.Fall, value: 'Осінь'},
]
