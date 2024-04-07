import ApiService from "./api.service";
import queryString from "query-string";
import { CountData } from "type/count-data";
import { CommentsType } from "type/commentsType";

export type CreateComments = {
  videoId: number;
  comment: string;
  commentId?: number;
  userAnswerId?: number;
}

export type CreateCommentsRate = {
  commentId: number;
  rate: boolean;
}

class CommentService {

  async get(queryObj: { videoId: number, page: number, count?: number }) {
    queryObj.count = queryObj.count || 20;
    const query = queryString.stringify(queryObj, {
      arrayFormat: 'comma',
      skipNull: true,
      skipEmptyString: true
    })
    return await ApiService.get('/comments?' + query) as CountData<CommentsType>
  }

  async create(comment: CreateComments) {
    return await ApiService.post('/comments', comment) as CommentsType;
  }

  async createRate(rate: CreateCommentsRate) {
    return await ApiService.post('/comments/rate', rate) as {
      commentId: number,
      rate: boolean,
      state: string
    };;
  }
}

export default new CommentService();
