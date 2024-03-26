import { Grid } from "@mui/material";
import clsx from "clsx";
import { FC, Fragment } from "react";
import ContainerWrapper from "../Container";
import styles from "./style";
import { TwoColumnLayoutTypes } from "./types";

const TwoColumnLayout: FC<TwoColumnLayoutTypes> = ({
  LeftSection,
  leftSectionStyles,
  RightSection,
  rightSectionStyles,
  pageTitle,
}): JSX.Element => {

  return (
    <ContainerWrapper>
      <Fragment>
      <Grid container columnSpacing={0.5} rowSpacing={4}>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <div className={clsx(styles.leftColumn, leftSectionStyles)}>
              {LeftSection}
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className={clsx(styles.rightColumn, rightSectionStyles)}>
              {/* <Typography>
                {pageTitle} 
              </Typography> */}
              {RightSection}
            </div>
          </Grid>
        </Grid>
      </Fragment>
    </ContainerWrapper>
  );
};

export default TwoColumnLayout;
