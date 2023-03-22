import { FC } from 'react';

import Skeleton from '@mui/material/Skeleton';
import { SkeletonProps } from '@mui/material/Skeleton/Skeleton';

interface IPlaceholder {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  bgColor?: string;
  borderRadius?: string;
  marginBottom?: string | number;
  maxWidth?: string | number;
}

export const Placeholder: FC<IPlaceholder & SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = 19,
  bgColor = '#e7edf0',
  borderRadius = '4px',
  marginBottom,
  maxWidth,
  sx,
}) => (
  <Skeleton
    classes={{ root: className }}
    variant={variant}
    width={width}
    height={height}
    sx={{
      bgcolor: bgColor,
      borderRadius: variant === 'circular' ? '50%' : borderRadius,
      marginBottom,
      maxWidth,
      ...sx,
    }}
  />
);
