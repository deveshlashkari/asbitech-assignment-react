import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme/theme";
import LifeEventForm from "./pages/LifeEventForm";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LifeEventForm />
    </ThemeProvider>
  );
}

export default App;
