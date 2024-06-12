import { Box, Button, Heading } from '@chakra-ui/react';
import { QuestionType } from '@src/api/api';
import { $quizStore, setCurrentQuestion } from '@src/pages/quiz/store';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

export const Question: FC<QuestionType> = (props) => {
  const {
    question,
    // category, correct_answer, difficulty, incorrect_answers, type,
  } = props;

  const { currentQuestion } = useUnit($quizStore);

  return (
    <Box>
      <Heading>
        {`${currentQuestion + 1}` + '. ' + decodeURIComponent(question)}
      </Heading>
      <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
        Следующий вопрос
      </Button>
    </Box>
  );
};
