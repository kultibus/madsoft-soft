import React, { FC, useId } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { $quizStore } from '@src/pages/quiz/store';
import { Questions } from '@src/api/api';

interface StepperProps {
  questions: Questions;
}

export const Stepper: FC<StepperProps> = (props) => {
  const { questions } = props;

  const { currentQuestion } = useUnit($quizStore);

  return (
    <List display='flex' gap={2}>
      {[...new Array(questions.length)]
        .map((_, i) => i)
        .map((elem) => {
          return (
            <ListItem
              key={useId()} // eslint-disable-line react-hooks/rules-of-hooks
              h='15px'
              bg={
                elem <= currentQuestion
                  ? 'var(--chakra-colors-red-500)'
                  : 'var(--chakra-colors-gray-200)'
              }
              flexGrow={1}
            />
          );
        })}
    </List>
  );
};
