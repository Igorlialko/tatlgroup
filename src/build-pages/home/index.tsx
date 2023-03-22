import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { TriggerRate } from '@/entities/trigger-rate';

import { Placeholder } from '@/shared/ui/atoms/placeholder';

import {
  useGetColumnQuery,
  useGetRateQuery,
  useGetStudentsQuery,
} from '@/shared/store/api/studentsApi';

import s from './home.module.scss';

interface Column {
  id: number | 'name' | 'position';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
}

const columns: Column[] = [
  { id: 'position', label: '№', minWidth: 70 },
  { id: 'name', label: 'Student', minWidth: 270 },
];

export const HomePage = () => {
  const {
    data: columnsData = {
      Items: Array.from({ length: 5 }, (el, i) => ({ Id: i, Title: 'i' })),
      Quantity: 0,
    },
    isLoading,
    error,
  } = useGetColumnQuery();
  const {
    data: studentsData = { Items: [], Quantity: 0 },
    isLoading: isLoadingStudents,
    error: errorStudents,
  } = useGetStudentsQuery();

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

  if (error || errorStudents) {
    return (
      <section className={s.section}>
        <h1 className={s.error}>
          Вибачте, виникли проблеми з сервером, спробуйте будь ласка пізніше
        </h1>
      </section>
    );
  }

  return (
    <section className={s.section}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(var(--app-height) - 40px - 66px - 66px)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {allColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      background: 'var(--primary-active-blue-bg)',
                    }}
                  >
                    {isLoading ? <Placeholder width="100%" /> : column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingStudents
                ? Array.from({ length: 20 }, (el, index) => (
                    <TableRow key={index + Date.now() + 0.01}>
                      {allColumns.map((column) => (
                        <TableCell key={column.id}>
                          <Placeholder width="100%" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : allRows.map((row) => {
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
    <TableRow>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {value}
          </TableCell>
        );
      })}
      {columnsData.Items.map((column, index) => {
        if (isLoading)
          return (
            <TableCell key={index + 0.01}>
              <Placeholder width="100%" />
            </TableCell>
          );
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
  );
};
