import {CategoriesService} from "service";
import {BaseResponse} from "type/base-response";
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

type State = {
  genre: BaseResponse[];
  isLoad: boolean;
}

type Action = {
  add: (brand: BaseResponse) => void;
  getGenre: () => Promise<void>;
  getAndReload: () => Promise<void>;
  remove: (id: number) => void;
}

const initState: State = {
  genre: [],
  isLoad: false,
}

export const useGenreStore = create<State & Action>()(persist((set, get) => ({
  ...initState,
  add(brand) {
    set({genre: [...get().genre, brand]});
  },
  async getGenre() {
    if (get().genre.length > 0)
      return Promise.resolve();
    console.log("useGenreStore", "Load arr brand. getGenre", get().genre)
    await get().getAndReload();
  },
  async getAndReload() {
    if (get().isLoad)
      return Promise.resolve();
    set({isLoad: true})
    const genre = await CategoriesService.getGenre();
    set({genre: genre || [], isLoad: false})
  },
  remove(id) {
    const newBrands = get().genre.filter(value => value.id != id);
    set({genre: newBrands});
  }
}), {
  name: 'useGenreStore',
  storage: createJSONStorage(() => sessionStorage),
}));

