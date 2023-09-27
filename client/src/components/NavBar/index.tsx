import { FC, SetStateAction, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { FlexBetween } from "../FlexBetween";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { setMode } from "../../redux";
import { IThemeSettings, IUser } from "../../interfaces";
import profile from "../../assets/profile.png";
import { navStyles } from "./styles";

interface IProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
  user: IUser;
}

export const NavBar: FC<IProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
}) => {
  const dispatch = useDispatch();
  const theme: IThemeSettings = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar sx={navStyles.appBar}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ marginRight: "24px" }}
          >
            <MenuIcon />
          </IconButton>

          <FlexBetween
            sx={{
              ...navStyles.searchBar,
              bgcolor: theme.palette.background.alt,
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap={"1.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>

          <FlexBetween>
            <Button onClick={handleClick} sx={navStyles.dropdown}>
              <Box
                component={"img"}
                alt="profile"
                src={profile}
                sx={navStyles.profileImg}
              />

              <Box textAlign={"left"}>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"0.85rem"}
                  sx={{ color: theme.palette.secondary[300] }}
                >
                  {user.name}
                </Typography>

                <Typography
                  fontSize={"0.75rem"}
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>

            <Menu
              open={isOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};
