import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import Layout from "./scenes/Layout";
import Products from "./scenes/Products";
import Customers from "./scenes/Customers";
import Transactions from "./scenes/Transactions";
import Geography from "./scenes/Geography";
import Overview from "./scenes/Overview";
import DailySales from "./scenes/DailySales";
import MonthlySales from "./scenes/MonthlySales";
import Breakdown from "./scenes/Breakdown";
import Admins from "./scenes/Admins";

function App() {
  const mode = useSelector((state: RootState) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<DailySales />} />
            <Route path="/monthly" element={<MonthlySales />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admins" element={<Admins />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
