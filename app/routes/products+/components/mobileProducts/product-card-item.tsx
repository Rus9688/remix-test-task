import {FC} from 'react';

import {Box, Typography} from '@mui/material';

interface ProductCardRowProps {
  label: string;
  value: string | number;
}

export const ProductCardItem: FC<ProductCardRowProps> = ({label, value}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
      <Typography fontWeight={500} variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={400} variant="body2" color="text.primary">
        {value}
      </Typography>
    </Box>
  );
};
