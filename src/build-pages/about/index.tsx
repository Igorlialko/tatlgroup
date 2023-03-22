import React from 'react';

import { useGetColumnQuery, useGetStudentsQuery } from '@/shared/store/api/studentsApi';

export const AboutPage = () => {
  const { data: studentsData, isLoading, error } = useGetStudentsQuery();
  const { data: columnsData, isLoading: isLoadingColumn, error: errorColumn } = useGetColumnQuery();

  const checkSumma = () => {
    let summa = '';
    if (columnsData) {
      columnsData.Items.forEach((el) => {
        const nums = el.Title.split('/');
        const numsSumma = +nums[0] + +nums[1];
        if (numsSumma > +summa) {
          summa = `${numsSumma}`;
        }
      });
    }
    return summa;
  };

  return (
    <section>
      {!isLoading && !error && <h1>{`Всього учнів: ${studentsData.Quantity}`}</h1>}
      {!isLoadingColumn && !errorColumn && <p>{`Найбільша сума : ${checkSumma()}`}</p>}
    </section>
  );
};
