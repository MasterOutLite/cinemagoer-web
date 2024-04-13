"use client"
import React from 'react';
import {Box, Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import {Series} from 'type';
import {TabPanel} from 'components/TabPanel/TabPanel';
import OutputOfSeries from 'components/OutputOfSeries/OutputOfSeries';


export interface RenderSeriesDayProps {
  series: [Series[]];
}

const seriesForDayOfWeek = [
  'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя',
]

function RenderSeriesDay({series}: RenderSeriesDayProps) {
  const day = new Date().getDay();
  const dayOfWeek = day == 0 ? 6 : day - 1;
  const [tab, setTab] = React.useState(dayOfWeek);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <Box>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs onChange={handleTab} value={tab}>
          {
            seriesForDayOfWeek.map((value, index) =>
              <Tab key={index} label={value}
                   tabIndex={index}/>)
          }
        </Tabs>
      </Box>

      {seriesForDayOfWeek.map((value, index) => (
        <TabPanel key={index} index={index} value={tab}>
          <OutputOfSeries maxHeightContent={500}
                          title={value} expanded={false} series={series[index]} index={index}/>
        </TabPanel>))
      }
    </Box>
  );
}

export default RenderSeriesDay;
