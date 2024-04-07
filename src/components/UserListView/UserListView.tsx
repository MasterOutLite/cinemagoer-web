import React from 'react';
import {Box, Tabs, Typography} from "@mui/material";
import Tab from "@mui/material/Tab";
import {ListView, VideoFromListView} from 'type/list-view';
import {TabPanel} from 'components/TabPanel/TabPanel';
import UserListViewTabContent from './UserListViewTabContent';


export interface UserListViewProps {
  userList: ListView[];
}

function UserListView({userList}: UserListViewProps) {

  const [tab, setTab] = React.useState(1);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  function remove(indexUserList: number) {
    return (videoId: number, newList: VideoFromListView[]) => {
      console.log("Remove list view", indexUserList, videoId);
      userList[indexUserList].listView = newList;
    }
  }

  console.log(userList[0]);


  return (
    <Box sx={{width: '100%', typography: 'body1'}}>

      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs onChange={handleTab} value={tab}>
          {
            userList.map((value, index) =>
              <Tab key={index} label={value.name}
                   tabIndex={index}/>)
          }
        </Tabs>
      </Box>

      {
        userList.map((value, index) =>
          <TabPanel key={index} value={tab} index={index}>
            {
              value.listView ?
                <UserListViewTabContent video={value.listView} userListViewId={value.id}
                                        remove={remove(index)}/>
                :
                <Typography>
                  Список пустий
                </Typography>
            }
          </TabPanel>
        )
      }

    </Box>
  );
}

export default UserListView;
