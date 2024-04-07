import {useAuthStore} from "store/useAuthStore";

const api = process.env.REACT_APP_API_URL;

//const api = 'http://localhost:5000/api';

class ApiService {
  async get(url: string) {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(api + url, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      console.log('ApiService', response.url, response.status, response.body);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async post(url: string, body: any,) {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(api + url, {
        method: 'post',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async postWithFile(url: string, body: FormData) {
    const token = useAuthStore.getState().token;
    const response = await fetch(api + url, {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: body
    });
    return await response.json();
  }

  async putWithFile(url: string, body: FormData) {
    const token = useAuthStore.getState().token;
    const response = await fetch(api + url, {
      method: 'put',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: body
    });
    return await response.json();
  }

  async delete(url: string) {
    console.log('ApiService', 'Delete', url)
    const token = useAuthStore.getState().token;
    const response = await fetch(api + url, {
      method: 'delete',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.status != 200)
      console.log(await response.json());

    return response.status;
  }
}

export default new ApiService();
