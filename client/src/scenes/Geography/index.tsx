import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { IThemeSettings } from "../../interfaces";
import { useGetGeographyQuery } from "../../redux/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../data/geoData";
import { geographyStyles } from "./styles";

const Geography = () => {
  const theme: IThemeSettings = useTheme();
  const { data } = useGetGeographyQuery();

  return (
    <Box>
      <Header title="GEOGRAPHY" subtitle="Know where your users are located" />

      <Box
        sx={{
          ...geographyStyles.wrapper,
          border: `0.2px solid ${theme.palette.secondary[300]}`,
        }}
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            colors={[
              "#CCEEF2",
              "#9CD7E5",
              "#3B94CB",
              "#248cd6",
              "#2A669F",
              "#234B83",
              "#1B3366",
              "#14204A",
            ]}
            theme={{
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#fff"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ccc"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 20,
                translateY: -25,
                itemsSpacing: 5,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.secondary[300],
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <Typography sx={{ m: "20px" }}>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
