import {BaseResponse} from "type";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import CategoriesService from "../service/categories.service";

type State = {
  ageRating: BaseResponse[];
  isLoad: boolean;
}

type Action = {
  add: (brand: BaseResponse) => void;
  getAgeRating: () => Promise<void>;
  getAndReload: () => Promise<void>;
  remove: (id: number) => void;
}

const initState: State = {
  ageRating: [],
  isLoad: false,
}

export const useAgeRatingStore = create<State & Action>()(persist((set, get) => ({
  ...initState,
  add(brand) {
    set({ageRating: [...get().ageRating, brand]});
  },
  async getAgeRating() {
    if (get().ageRating.length > 0)
      return Promise.resolve();
    console.log("useAgeRatingStore", "Load arr brand. getAgeRating", get().ageRating)
    await get().getAndReload();
  },
  async getAndReload() {
    if (get().isLoad)
      return Promise.resolve();
    set({isLoad: true})
    const ageRating = await CategoriesService.getAgeRating()
    set({ageRating: ageRating || [], isLoad: false})
  },
  remove(id) {
    const newBrands = get().ageRating.filter(value => value.id != id);
    set({ageRating: newBrands});
  }
}), {
  name: 'useAgeRatingStore',
  storage: createJSONStorage(() => sessionStorage),
}));

