import React, { useMemo } from 'react';

import Link from 'next/link';

import { useGetColumnQuery, useGetStudentsQuery } from '@/shared/store/api/studentsApi';

import s from './about.module.scss';

export const AboutPage = () => {
  const { data: studentsData, isLoading, error } = useGetStudentsQuery();
  const { data: columnsData, isLoading: isLoadingColumn, error: errorColumn } = useGetColumnQuery();

  const checkSumma = useMemo(() => {
    if (!columnsData) return;
    let summa = '';
    let findElement;
    if (columnsData) {
      columnsData.Items.forEach((el) => {
        const nums = el.Title.split('/');
        const numsSumma = +nums[0] + +nums[1];
        if (numsSumma > +summa) {
          summa = `${numsSumma}`;
          findElement = el;
        }
      });
    }
    return { summa, findElement };
  }, [columnsData]);

  return (
    <section className={s.section}>
      {!isLoading && !isLoadingColumn && (
        <>
          {!error && <h1>{`Всього учнів - ${studentsData.Quantity}`}</h1>}
          {!errorColumn && checkSumma && (
            <p>{`Найбільша сума в елемента ${checkSumma.findElement.Title} : ${checkSumma.summa}`}</p>
          )}
          <p className="body3">
            Це сторінка <strong>статистики</strong>.
          </p>
          <p className="body3">
            Для перегляду більшої інформації перейдіть будь ласка на{' '}
            <Link href="/" className="link">
              <strong>головну</strong>
            </Link>
          </p>
        </>
      )}
    </section>
  );
};
