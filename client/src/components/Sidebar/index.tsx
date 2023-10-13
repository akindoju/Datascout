import { FC, SetStateAction, useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexBetween } from "../FlexBetween";
import profile from "../../assets/profile.png";
import { NAV_ITEMS } from "../../utils";
import { IThemeSettings, IUser } from "../../interfaces";
import { sidebarStyles } from "./styles";

interface IProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
  isMobileView: boolean;
  drawerWidth: string;
  user: IUser;
}

export const Sidebar: FC<IProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobileView,
  drawerWidth,
  user,
}) => {
  const [active, setActive] = useState<string>("");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme: IThemeSettings = useTheme();

  const isSidebarLimit = useMediaQuery("(max-width: 1210px)");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component={"nav"}>
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          display: "flex",
          flexDirection: "column",

          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
            borderWidth: isMobileView ? "2px" : 0,
            width: drawerWidth,
          },
        }}
      >
        <Box width={"100%"}>
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                <Typography variant="h4" fontWeight={"bold"}>
                  DataScout
                </Typography>
              </Box>
              {isMobileView && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>

          <Box
            sx={{
              ...sidebarStyles.listWrapper,
              maxHeight: isSidebarLimit ? "500px" : "1000px",
            }}
          >
            <List>
              {NAV_ITEMS.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        ...sidebarStyles.list,
                        color: theme.palette.secondary[500],
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        bgcolor:
                          active === lcText
                            ? theme.palette.secondary[0.5]
                            : "transparent",
                        borderLeft: "3px solid transparent",
                        borderLeftColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : theme.palette.secondary[100],
                        }}
                      >
                        {icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={text}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontWeight: active === lcText ? 500 : 400,
                          },
                        }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>

        <Box
          sx={{
            ...sidebarStyles.footer,
            borderTop: `1px solid ${theme.palette.action.border}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component={"img"}
              alt="profile"
              src={profile}
              sx={sidebarStyles.profileImg}
            />

            <Box textAlign={"left"}>
              <Typography
                fontWeight={"bold"}
                fontSize={"0.9rem"}
                sx={{ color: theme.palette.secondary[300] }}
              >
                {user.name}
              </Typography>

              <Typography
                fontSize={"0.8rem"}
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.occupation}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
