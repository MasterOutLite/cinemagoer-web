import React, {useEffect, useState} from 'react';
import {Container, Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import {TabPanel} from 'components/TabPanel/TabPanel';
import CreateVideoSeriesList from 'components/Create/CreateVideoSeries/CreateVideoSeriesList';
import {Roles} from 'helper/roles';
import {useAuthStore} from 'store/useAuthStore';
import CreateVideo from 'components/Create/CreateVideo/CreateVideo';
import {useNavigate} from "react-router-dom";

function AdminPage() {

  const {user} = useAuthStore();
  const [tab, setTab] = React.useState(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user)
      return;

    const admin = user.roles.includes(Roles.ADMIN);
    if (!admin)
      navigate("/");

    setIsAdmin(admin);
  }, []);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  if (user)
    return (
      <Container>
        <Tabs onChange={handleTab} value={tab}>
          <Tab label={'Відео'}
               tabIndex={0}/>)
          <Tab label={'Відео сірії'}
               tabIndex={1}/>)
        </Tabs>

        <TabPanel index={0} value={tab}>
          <CreateVideo/>
        </TabPanel>

        <TabPanel index={1} value={tab}>
          <CreateVideoSeriesList save={series => {
          }}/>
        </TabPanel>

      </Container>
    );
  else {

    return (
      <div>
        Auth no admin
        {
          JSON.stringify(user)
        }
      </div>
    )
  }

}

export default AdminPage;
