import {useDateStore} from "../store/useDateStore";

class FilterService {

    getType() {

        if (useDateStore.getState().type) {
            return useDateStore.getState().type;
        }


    }
}

export default new FilterService();
