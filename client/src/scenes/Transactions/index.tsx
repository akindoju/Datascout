import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { IThemeSettings } from "../../interfaces";
import { useGetTransactionsQuery } from "../../redux/api";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Transactions = () => {
  const theme: IThemeSettings = useTheme();

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const [sort, setSort] = useState<GridSortModel>([
    {
      field: "",
      sort: "desc",
    },
  ]);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort[0]),
    search,
  });

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

  const handlePaginationModelChange = (data: {
    page: number;
    pageSize: number;
  }) => {
    setPage(data.page);
    setPageSize(data.pageSize);
  };

  return (
    <Box>
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />

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
          rows={(data && data.transactions) || []}
          columns={columns}
          loading={isLoading}
          getRowId={(row: { _id: string }) => row._id}
          rowCount={(data && data.total) || 0}
          pagination
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          paginationModel={{
            pageSize,
            page,
          }}
          onPaginationModelChange={(data) => handlePaginationModelChange(data)}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
