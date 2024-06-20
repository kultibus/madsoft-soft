import React, { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTimer } from './hooks/useTimer';

export const Timer: FC = () => {
  const { formatedTime, isAttention } = useTimer();

  return (
    <Box
      border={'1px solid var(--chakra-colors-gray-500)'}
      borderColor={isAttention && 'var(--chakra-colors-red-500)'}
      borderRadius={4}
      px={2}
    >
      <Text
        fontSize='xl'
        fontWeight={400}
        color={isAttention && 'var(--chakra-colors-red-500)'}
      >
        {formatedTime}
      </Text>
    </Box>
  );
};
