import { Typography } from "@mui/material";
import Link from '@mui/material/Link';
import { FC } from "react";

const Footer: FC = ({}): JSX.Element => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.nagarro.com/en">
        Nagarro
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Footer;
