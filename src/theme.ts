import { createMuiTheme } from "@material-ui/core";
import teal from "@material-ui/core/colors/teal";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
  palette: {
    primary: teal,
    secondary: lightBlue,
  },
});

export { theme };
