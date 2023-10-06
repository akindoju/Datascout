import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { IThemeSettings } from "../../interfaces";
import { useGetSalesQuery } from "../../redux/api";

interface IProps {
  isDashboard?: boolean;
}

const BreakdownChart = ({ isDashboard = false }: IProps) => {
  const theme: IThemeSettings = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  if (!data || isLoading) {
    return <Typography sx={{ m: "20px" }}>Loading...</Typography>;
  }

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales]) => ({
      id: category,
      label: category[0].toUpperCase() + category.substring(1),
      value: sales,
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLinkLabel={"label"}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="black"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 20,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total:"} ${data.yearlySalesTotal.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
