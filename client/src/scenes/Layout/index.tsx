import { Box, styled, useMediaQuery } from "@mui/material";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { Sidebar } from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/api";
import Header from "../../components/Header";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open: boolean;
  isMobileView: boolean;
}>(({ theme, open, isMobileView }) => ({
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
  marginLeft: isMobileView || open ? 0 : "-250px",
}));

const Layout: FC = () => {
  const isMobileView = useMediaQuery("(max-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const userId = useSelector((state: RootState) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box width="100%" height="100%" display={isMobileView ? "block" : "flex"}>
      <Sidebar
        drawerWidth="250px"
        isMobileView={isMobileView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={data || {}}
      />

      <Main open={isSidebarOpen} isMobileView={isMobileView}>
        <NavBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          user={data || {}}
        />
        <Box m="0.8rem 1.5rem">
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
