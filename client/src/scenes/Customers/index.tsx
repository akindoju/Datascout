import { Box, useTheme } from "@mui/material";
import { FC } from "react";
import Header from "../../components/Header";
import { useGetCustomersQuery } from "../../redux/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IThemeSettings } from "../../interfaces";

const Customers: FC = () => {
  const theme: IThemeSettings = useTheme();
  const { data, isLoading } = useGetCustomersQuery();

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box>
      <Header title="CUSTOMERS" subtitle="List of Customers" />

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
            color: theme.palette.secondary[100],
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
          rows={data || []}
          columns={columns}
          loading={isLoading}
          getRowId={(row: { _id: string }) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 25, 50, 100]}
        />
      </Box>
    </Box>
  );
};

export default Customers;
