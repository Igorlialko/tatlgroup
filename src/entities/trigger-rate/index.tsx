import React, { useState } from 'react';

import { TableCell } from '@mui/material';

import { useCreateRateMutation, useDeleteRateMutation } from '@/shared/store/api/studentsApi';

export const TriggerRate = ({ value, SchoolboyId, ColumnId }) => {
  const [actualValue, setActualValue] = useState(value); //щоб не робити рефетч для учня
  const [createRate, { isLoading: isLoadingCreate }] = useCreateRateMutation();
  const [deleteRate, { isLoading: isLoadingDelete }] = useDeleteRateMutation();

  const rateTrigger = async () => {
    let res: { data?: object; error?: object };
    if (actualValue) {
      res = await deleteRate({ SchoolboyId, ColumnId });
      if (Object.prototype.hasOwnProperty.call(res, 'data')) {
        setActualValue('');
        return;
      }
    } else {
      res = await createRate({ SchoolboyId, ColumnId });
      if (Object.prototype.hasOwnProperty.call(res, 'data')) {
        setActualValue('H'); //хардкодимо оскільки у нас дані постійно однакові, в іншому випадку, потрібно щоб бек кидав у відповідь оновлені дані
        return;
      }
    }
    if (Object.prototype.hasOwnProperty.call(res, 'error')) {
      alert('Something went wrong'); //тут можемо обробити всі помилки
    }
  };

  return (
    <TableCell
      sx={{
        pointerEvents: (isLoadingCreate || isLoadingDelete) && 'none',
        opacity: (isLoadingCreate || isLoadingDelete) && 0.5,
        cursor: 'pointer',
        transition: 'all 200ms',
        '@media(hover:hover)': {
          '&:hover': {
            background: !actualValue ? 'var(--icons-white)' : 'var(--bg-error)',
          },
        },
      }}
      align="center"
      role="button"
      onClick={rateTrigger}
    >
      {actualValue}
    </TableCell>
  );
};
