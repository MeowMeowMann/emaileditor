import { Grid } from '@mui/material';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import { FC, Fragment } from "react";
import DrawerContainer from '../../Components/Commmon/CustomTabPanel/CustomTabPanel';
import DropContainer from '../../Components/Commmon/Partials/Containers/DropContainer/DropContainer';
import Footer from '../../Components/Commmon/Partials/Footer';
import Header from '../../Components/Commmon/Partials/Header';
import TwoColumnLayout from "../../Components/Commmon/TwoColumnLayout";



const Editor: FC = (): JSX.Element => {
  return (

    <Fragment>
      <Grid container columnSpacing={0.5} rowSpacing={4}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Header/>
        </Grid>
        
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <TwoColumnLayout
            LeftSection={<DropContainer/>}
            // RightSection={<DragContainer/>}
            RightSection={<DrawerContainer/>}
          pageTitle={"Demo Title"}
        />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Footer/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Editor;
