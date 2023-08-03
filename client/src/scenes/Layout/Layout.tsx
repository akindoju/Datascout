import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";

export const Layout: FC = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        <NavBar />
        <Outlet />
      </Box>
    </Box>
  );
};
