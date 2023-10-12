import { Box, Typography, useTheme } from "@mui/material";
import { IThemeSettings } from "../../interfaces";
import { FlexBetween } from "../FlexBetween";

interface IProps {
  title: string;
  value: number | undefined;
  increase?: string;
  description: string;
  icon: JSX.Element;
}

const StatsBox = ({ title, value, increase, description, icon }: IProps) => {
  const theme: IThemeSettings = useTheme();

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      bgcolor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>

        {icon}
      </FlexBetween>

      <FlexBetween gap="1rem">
        <Typography
          variant="h3"
          fontWeight="600"
          sx={{ color: theme.palette.secondary[300] }}
        >
          {value?.toLocaleString()}
        </Typography>

        <Typography
          variant="h5"
          sx={{ color: theme.palette.secondary.light }}
          fontSize={"12px"}
        >
          (<span>{increase}</span>)
        </Typography>
      </FlexBetween>

      <Typography fontSize={"13px"}>{description}</Typography>
    </Box>
  );
};

export default StatsBox;
