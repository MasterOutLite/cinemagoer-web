import {CreateSeries, Series} from "./series";

export type IdentitySeries = Series & {
  uuid: string;
}

export type IdentityCreateSeries = CreateSeries & {
  uuid: string;
}
