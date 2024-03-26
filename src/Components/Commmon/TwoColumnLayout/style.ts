import theme from "../../../theme";

const styles = {
    rightColumn: {
      borderTop: `3px solid ${theme.palette.commonColors.separator}`,
      marginTop: "30px",
      [theme.breakpoints.up("md")]: {
        marginLeft: "22px",
        marginTop: "0",
      },
    },
    pageHeading: {
      fontWeight: theme.typography.fontWeightMedium,
      margin: "20px 0 46px 0",
    },
    leftColumn: {
      border: `1px solid ${theme.palette.commonColors.separator}`,
      borderRadius: "10px",
      [theme.breakpoints.up("md")]: {
        marginRight: "22px",
      },
    },
  };
export default styles;
