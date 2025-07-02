import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4285f4", // Google Blue - used for primary buttons, links, and accents
      dark: "#3367d6", // Darker Google Blue - used for hover states and pressed buttons
    },
    secondary: {
      main: "#757575", // Medium grey - used for secondary text and subtle elements
    },
    background: {
      default: "#ffffff", // Pure white - main page background
      paper: "#fafafa", // Very light grey - card and form backgrounds for subtle elevation
    },
    divider: "#e0e0e0", // Light grey - borders, dividers, and subtle separations
    grey: {
      50: "#f9f9f9", // Lightest grey - hover states and very subtle backgrounds
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
