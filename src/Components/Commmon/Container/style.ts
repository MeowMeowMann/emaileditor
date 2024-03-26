import theme from "../../../theme";

const styles = {
    root: {
      maxWidth: "1180px",
      margin: "0 auto",
      padding: "80px 24px 80px",
      [theme.breakpoints.up("md")]: {
        padding: "110px 16px 80px",
      },
    },
  };

export default styles;
