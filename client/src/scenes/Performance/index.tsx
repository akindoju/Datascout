import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useGetUserPerformanceQuery } from "../../redux/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IThemeSettings } from "../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Performance = () => {
  const theme: IThemeSettings = useTheme();
  const userId = useSelector((state: RootState) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  console.log({ data });

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box>
      <Header
        title="PERFORMANCE"
        subtitle="Track your affiliate sales performance"
      />

      <Box
        mt={"40px"}
        height={"75vh"}
        borderRadius={"4px"}
        border={`2px solid ${theme.palette.background.alt}`}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderColor: theme.palette.background.alt,
            borderBottomWidth: "2px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[300],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={(data && data.sales) || []}
          columns={columns}
          loading={isLoading}
          getRowId={(row: { _id: string }) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
        />
      </Box>
    </Box>
  );
};

export default Performance;
