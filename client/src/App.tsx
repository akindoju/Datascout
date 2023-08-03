import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useMemo } from "react";

function App() {
  const mode = useSelector((state: RootState) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
