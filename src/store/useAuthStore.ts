import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import {createJSONStorage, persist} from "zustand/middleware";
import UserListViewService from "../service/user-list-view.service";
import {Auth, ListView} from "type";


type State = {
  token: string,
  user: Auth | undefined,
  userList: ListView[]
}

type Action = {
  setToken: (token: string) => void;
  getOut: () => void;

}

const initState: State = {
  userList: [],
  token: '',
  user: undefined,
}

export const useAuthStore = create<State & Action>()(
  persist((set) => (
    {
      ...initState,
      async setToken(token: string) {
        if (!token)
          return;

        const user = jwtDecode(token) as Auth;
        set({token, user});

        const date = await UserListViewService.getUserList();
        console.log('AuthStore');
        console.log(date);
        set({userList: date})
      },
      getOut() {
        set({user: undefined, userList: [], token: ''});
      },
    }
  ), {
    name: 'auth-store',
    storage: createJSONStorage(() => localStorage),
    // merge: (persistedState: any, currentState) => {
    //   console.log("token", persistedState.token)
    //   console.log("persistedState", persistedState)
    //   const decode = jwtDecode(persistedState.token);
    //   if (!decode.exp) {
    //     return initState;
    //   }
    //
    //   const date = new Date(decode.exp * 1000);
    //   console.log(date)
    //   if (date < new Date()) {
    //     console.log("Invalid token date", date);
    //     return initState
    //   }
    //   currentState.token = persistedState.token;
    //   currentState.user = persistedState.user;
    //
    //   return currentState;
    // }
  }));
