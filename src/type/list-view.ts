import {VideoType} from "./videoType";

export type ListView = {
  id: number;
  name: string;
  listViewStateId: number;
  userId: number;
  listView?: VideoFromListView[];
}

export type VideoFromListView = {
  id: number;
  userListViewId:number;
  video: VideoType;
}
