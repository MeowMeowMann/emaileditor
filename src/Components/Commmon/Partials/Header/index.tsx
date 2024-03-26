import { AppBar } from "@material-ui/core";
import { EditRounded } from "@material-ui/icons";
import { Toolbar, Typography } from "@mui/material";
import { FC } from "react";

const Header: FC = ({}): JSX.Element => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <EditRounded />
        <Typography variant="h5">Email Editor</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
