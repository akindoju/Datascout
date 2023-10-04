import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";

const Overview = () => {
  const [view, setView] = useState<string>("units");

  return (
    <Box>
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />

      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>

          <Select
            value={view}
            label="View"
            onChange={({ target }) => setView(target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>

        {/* <OverviewChart view={view} /> */}
      </Box>
    </Box>
  );
};

export default Overview;
