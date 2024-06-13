import React, { FC } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Questions } from '@src/api/api';
import { $quizStore, setCurrentQuestion } from '@src/pages/quiz/store';
import { RESULT_ROUTE } from '@src/routes';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';
import { AppBtn } from '../UI/AppBtn';

interface QuestionProps {
  questions: Questions;
}

export const Question: FC<QuestionProps> = (props) => {
  const { questions } = props;

  const { currentQuestion } = useUnit($quizStore);

  const isLastQuestion = questions.length - currentQuestion === 1;

  const handleClick = () => {
    if (isLastQuestion) return;

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <Box display='flex' flexDir='column' gap={4} alignItems='start'>
      <Heading size='lg'>
        {`${currentQuestion + 1}` + '. ' + questions[currentQuestion].question}
      </Heading>

      {!isLastQuestion ? (
        <AppBtn onClick={handleClick}>Следующий вопрос</AppBtn>
      ) : (
        <AppBtn>
          <Link to={RESULT_ROUTE}>Закончить тестирование</Link>
        </AppBtn>
      )}
    </Box>
  );
};
