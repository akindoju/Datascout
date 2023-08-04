import { Box, styled, useMediaQuery } from "@mui/material";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { Sidebar } from "../../components/Sidebar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open: boolean;
  isNonMobile: boolean;
}>(({ theme, open, isNonMobile }) => ({
  flexGrow: 1,
  transition: open
    ? theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })
    : theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  marginLeft: !isNonMobile || open ? 0 : "-250px",
}));

export const Layout: FC = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <Sidebar
        drawerWidth="250px"
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Main open={isSidebarOpen} isNonMobile={isNonMobile}>
        <NavBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Main>
    </Box>
  );
};
