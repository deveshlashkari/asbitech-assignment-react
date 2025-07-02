import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4285f4",
      dark: "#3367d6",
    },
    secondary: {
      main: "#757575",
    },
    background: {
      default: "#ffffff",
      paper: "#fafafa",
    },
    divider: "#e0e0e0",
    grey: {
      50: "#f9f9f9",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 400,
    },
    h5: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});
