import {BaseResponse} from "type";
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import CategoriesService from "../service/categories.service";

type State = {
  publisher: BaseResponse[];
  isLoad: boolean;
}

type Action = {
  add: (brand: BaseResponse) => void;
  getPublisher: () => Promise<void>;
  getAndReload: () => Promise<void>;
  remove: (id: number) => void;
}

const initState: State = {
  publisher: [],
  isLoad: false,
}

export const usePublisherStore = create<State & Action>()(persist((set, get) => ({
  ...initState,
  add(brand) {
    set({publisher: [...get().publisher, brand]});
  },
  async getPublisher() {
    if (get().publisher.length > 0)
      return Promise.resolve();
    console.log("usePublisherStore", "Load arr brand. getPublisher", get().publisher)
    await get().getAndReload();
  },
  async getAndReload() {
    if (get().isLoad)
      return Promise.resolve();
    set({isLoad: true})
    const publishers = await CategoriesService.getPublisher()
    set({publisher: publishers || [], isLoad: false})
  },
  remove(id) {
    const newBrands = get().publisher.filter(value => value.id != id);
    set({publisher: newBrands});
  }
}), {
  name: 'usePublisherStore',
  storage: createJSONStorage(() => sessionStorage),
}));
