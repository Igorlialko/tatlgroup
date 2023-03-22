import React, { useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  useCreateRateMutation,
  useDeleteRateMutation,
  useGetColumnQuery,
  useGetRateQuery,
  useGetStudentsQuery,
} from '@/shared/store/api/studentsApi';

interface Column {
  id: number | 'name' | 'position';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
}

const columns: Column[] = [
  { id: 'position', label: '№', minWidth: 170 },
  { id: 'name', label: 'Student', minWidth: 170 },
];

export const HomePage = () => {
  const { data: columnsData = { Items: [], Quantity: 0 }, isLoading, error } = useGetColumnQuery();
  const { data: studentsData = { Items: [], Quantity: 0 } } = useGetStudentsQuery();

  const allColumns: Column[] = [
    ...columns,
    ...columnsData.Items.map(
      (el) =>
        ({
          id: el.Id,
          label: el.Title,
          minWidth: 100,
          align: 'center',
        } as Column),
    ),
  ];

  const allRows = studentsData.Items.map((student, indexStudent) => ({
    position: indexStudent + 1,
    name: `${student.LastName ? `${student.LastName} ` : ''}${
      student.FirstName ? student.FirstName : ''
    }${student.SecondName ? ` ${student.SecondName}` : ''}`,
    SchoolboyId: student.Id,
  }));

  return (
    <section>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {allColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allRows.map((row) => {
                return (
                  <CustomRow
                    key={row.position}
                    row={row}
                    columns={columns}
                    columnsData={columnsData}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </section>
  );
};

const CustomRow = ({ columns, row, columnsData }) => {
  const { data: ratesData = { Items: [], Quantity: 0 }, isLoading } = useGetRateQuery({
    SchoolboyId: row.SchoolboyId,
  });

  return (
    !isLoading && (
      <TableRow>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {value}
            </TableCell>
          );
        })}
        {columnsData.Items.map((column) => {
          const value = ratesData.Items.find((el) => el.ColumnId === column.Id)?.Title;
          return (
            <TriggerRate
              value={value}
              key={column.Id}
              SchoolboyId={row.SchoolboyId}
              ColumnId={column.Id}
            />
          );
        })}
      </TableRow>
    )
  );
};

const TriggerRate = ({ value, SchoolboyId, ColumnId }) => {
  const [actualValue, setActualValue] = useState(value); //щоб не робити рефетч для учня
  const [createRate, { isLoading: isLoadingCreate }] = useCreateRateMutation();
  const [deleteRate, { isLoading: isLoadingDelete }] = useDeleteRateMutation();

  const rateTrigger = async () => {
    let res: { data?: object; error?: object } = {};
    if (actualValue) {
      res = await deleteRate({ SchoolboyId, ColumnId });
      if (Object.prototype.hasOwnProperty.call(res, 'data')) {
        setActualValue('');
      }
    } else {
      res = await createRate({ SchoolboyId, ColumnId });
      if (Object.prototype.hasOwnProperty.call(res, 'data')) {
        setActualValue('H'); //хардкодимо оскільки у нас дані постійно однакові, в іншому випадку, потрібно щоб бек кидав у відповідь оновлені дані
      }
    }
    if (Object.prototype.hasOwnProperty.call(res, 'error')) {
      alert('Something went wrong'); //
    }
  };

  return (
    <TableCell align="center" role="button" onClick={rateTrigger}>
      {actualValue}
    </TableCell>
  );
};
