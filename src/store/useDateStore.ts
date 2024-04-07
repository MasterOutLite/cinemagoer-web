import {BaseResponse} from "type";
import {create} from "zustand";

type State = {
  type: BaseResponse[];
  status: BaseResponse[];
  ageRating: BaseResponse[];
  genre: BaseResponse[];
}
type Action = {
  setType: (value: BaseResponse[]) => void;
  setStatus: (value: BaseResponse[]) => void;
  setAgeRating: (value: BaseResponse[]) => void;
  setGenre: (value: BaseResponse[]) => void;
}

export const useDateStore = create<State & Action>((set, get) => (
  {
    type: [],
    status: [],
    ageRating: [],
    genre: [],

    setType(type) {
      set(state => ({...state, type}))
    },
    setStatus(status) {
      set((state: any) => ({...state, status}))
    },
    setAgeRating(ageRating: any) {
      set((state: any) => ({...state, ageRating}))
    },
    setGenre(genre: any) {
      set((state: any) => ({...state, genre}))
    },
  }
));
