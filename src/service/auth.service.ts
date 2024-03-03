import {sendRequestPost} from "../helper/api";
import {useAuthStore} from "../store/useAuthStore";

class AuthService {

    async loginUser(login: string, password: string) {
        const url = 'auth/login';
        const date = await sendRequestPost(url, {login, password},);
        useAuthStore.getState().setToken(date.token);
    }

    async registrationUser(login: string, password: string, nickname: string) {
        const url = 'auth/registration';
        const date = await sendRequestPost(url, {login, password, nickname});
        useAuthStore.getState().setToken(date.token);
    }
}

export default new AuthService();
