import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IGetStudents {
  Items: {
    Id: number;
    FirstName: string;
    SecondName?: string;
    LastName?: string;
  }[];
  Quantity: number;
}

interface IGetColumn {
  Items: {
    Id: number;
    Title: string;
  }[];
  Quantity: number;
}

interface IGetRates {
  Items: {
    Id: number;
    ColumnId: number;
    SchoolboyId: number;
    Title: string;
  }[];
  Quantity: number;
}

interface ITriggerRate {
  SchoolboyId: number;
  ColumnId: number;
}

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://94.131.246.109:5555/v1/2/',
  }),
  endpoints: (build) => ({
    getStudents: build.query<IGetStudents, void>({
      query: () => 'Schoolboy',
    }),
    getColumn: build.query<IGetColumn, void>({
      query: () => 'Column',
    }),
    getRate: build.query<IGetRates, { SchoolboyId?: number }>({
      query: ({ SchoolboyId }) => ({
        url: 'Rate',
        params: {
          SchoolboyId,
        },
      }),
    }),
    createRate: build.mutation<null, ITriggerRate>({
      query: ({ SchoolboyId, ColumnId }) => ({
        url: 'Rate',
        method: 'POST',
        body: {
          SchoolboyId,
          ColumnId,
          Title: 'H',
        },
      }),
    }),
    deleteRate: build.mutation<null, ITriggerRate>({
      query: ({ SchoolboyId, ColumnId }) => ({
        url: 'UnRate',
        method: 'POST',
        body: {
          SchoolboyId,
          ColumnId,
        },
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetColumnQuery,
  useGetRateQuery,
  useCreateRateMutation,
  useDeleteRateMutation,
} = studentsApi;
