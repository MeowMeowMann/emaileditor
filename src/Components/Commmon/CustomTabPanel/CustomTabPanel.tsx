import { AddToPhotosRounded, PaletteOutlined, ViewModuleRounded } from '@material-ui/icons';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import BlockContainer from '../../../Containers/BlockContainer';
import CustomizationContainer from '../../../Containers/CustomizationContainer';
import { useClickContext } from '../../../Context/ClickContext';
import DragContainer from '../Partials/Containers/DragContainer/DragContainer';
import { useStyles } from './style';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DrawerContainer: React.FC = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { isClicked,setIsClicked } = useClickContext();



  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
    {isClicked ? (
                  <BlockContainer />

    ) : (
      <Grid container>
        <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
          <CustomTabPanel value={value} index={0}>
            <DragContainer />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CustomizationContainer />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <BlockContainer />
          </CustomTabPanel>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation="vertical"
          >
            <Tab sx={{ fontSize: 10, textAlign: "left" }} label={<><AddToPhotosRounded />Content</>} {...a11yProps(0)} />
            <Tab sx={{ fontSize: 10, textAlign: "left" }} label={<><PaletteOutlined />Body</>} {...a11yProps(1)} />
            <Tab sx={{ fontSize: 10, textAlign: "left" }} label={<><ViewModuleRounded />Blocks</>} {...a11yProps(2)} />
          </Tabs>
        </Grid>
      </Grid>
    )}
  </div>
  );
}

export default DrawerContainer;
