import {useAuthStore} from "../store/useAuthStore";

export const apiPath = process.env.REACT_APP_API_URL;

//'http://localhost:5000/';

export enum BasePath {
  genre = 'genre',
  ageRating = 'age-rating',
  comments = 'comments',
  publisher = 'publisher',
}

export enum VideoCategory {
  Movie = 'movie',
  Serial = 'serial',
  Cartoon = 'cartoon',
  Anime = 'anime'
}

export async function sendRequest(url: string, method?: 'post' | 'put' | 'delete', body?: object, header?: HeadersInit) {
  const token = useAuthStore.getState().token;
  const res = await fetch(apiPath + '/api/' + url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Access-Control-Allow-Origin': "*",
      ...header
    },
    body: JSON.stringify(body),
    method: method || 'get'
  });

  console.log('API sendRequest:',res);

  if (!res.ok) {
    console.log(url)
    //console.log(await res.json())
    if (res.status === 401)
      useAuthStore.getState().getOut();
    else
      throw new Error('Failed to fetch data.' + 'Url: ' + url)
  }
  return await res.json();
}

export async function sendRequestPost(url: string, body: object, header?: HeadersInit) {
  return await sendRequest(url, "post", body, header || {"Content-Type": "application/json",})
}

export async function getBaseRequest(base: BasePath | string, query?: string) {
  const queryRequest = query ? '?' + query : '';
  const url = `${base}` + queryRequest;
  return await sendRequest(url);
}

export enum PostPatch {
  Comments = 'comments',
  CommentsRate = 'comments/rate',
  UserList = 'user-list-view'
}

export async function post(path: PostPatch | string, date: object) {
  const url = `${path}`;
  return await sendRequestPost(url, date);
}

export async function postWithFile(path: string, date: object) {
  const url = `${path}`;
  return await sendRequestPost(url, date, {'Content-Type': 'application/x-www-form-urlencoded'});
}

