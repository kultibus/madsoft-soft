import React, { FC, useId } from 'react';
import { Box } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { $quizStore } from '@src/pages/quiz/store';

export const Stepper: FC = () => {
  const { currentQuestion } = useUnit($quizStore);

  return (
    <Box display='flex' w='100%' gap={4}>
      {[...new Array(10)]
        .map((_, i) => i)
        .map((elem) => {
          return (
            <Box
              key={useId()} // eslint-disable-line react-hooks/rules-of-hooks
              h='15px'
              bg={
                elem <= currentQuestion
                  ? 'var(--chakra-colors-red-500)'
                  : 'var(--chakra-colors-gray-200)'
              }
              w='10%'
              flexShrink={1}
            />
          );
        })}
    </Box>
  );
};
