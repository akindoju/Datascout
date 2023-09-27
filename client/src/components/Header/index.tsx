import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { IThemeSettings } from "../../interfaces";

interface IProps {
  title: string;
  subtitle: string;
}

const Header: FC<IProps> = ({ title, subtitle }) => {
  const theme: IThemeSettings = useTheme();

  return (
    <Box>
      <Typography
        color={theme.palette.secondary[300]}
        fontWeight="bold"
        fontSize={"25px"}
      >
        {title}
      </Typography>

      <Typography
        variant="h6"
        color={theme.palette.secondary[200]}
        fontSize={"12px"}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
