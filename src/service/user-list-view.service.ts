import {ListView} from "type/list-view";
import {ListViewVideo} from "type/list-view-video";
import ApiService from "./api.service";
import {StateAction} from "../type/state-action";

class UserListViewService {

  path = '/user-list-view';

  async getListViewVideo(id: number) {
    const url = `${this.path}/listView?videoId=${id}`;
    return await ApiService.get(url) as ListViewVideo;
  }

  async getUserListWithVideo() {
    const url = `${this.path}/video`;
    return await ApiService.get(url) as ListView[];
  }

  async getUserList() {
    return await ApiService.get(this.path) as ListView[];
  }

  async addVideoToUserListView(userListViewId: number, videoId: number, action: StateAction) {
    return await ApiService.post(this.path, {
      userListViewId,
      videoId,
      action
    }) as { userListViewId: number, videoId: number, add: boolean, action: StateAction }
  }

  async removeVideoToUserListView(userListViewId: number, videoId: number) {
    return await ApiService.delete(this.path + `/${userListViewId}/${videoId}`,)
  }

}

export default new UserListViewService()
