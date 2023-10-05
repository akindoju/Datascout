import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IMonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query<[], void>({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query<[], void>({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query<[], void>({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query<{ monthlyData: IMonthlyData }, void>({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
} = api;
