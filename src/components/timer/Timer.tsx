import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useTimer } from './hooks/useTimer';

export const Timer: FC = () => {
  const { formatedTime, isAttention } = useTimer();

  return (
    <Box
      fontSize='3xl'
      color={isAttention && 'var(--chakra-colors-red-500)'}
      fontWeight={400}
    >
      {formatedTime}
    </Box>
  );
};
