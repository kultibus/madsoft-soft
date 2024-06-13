import React, { FC } from 'react';
import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Questions } from '@src/api/api';
import {
  $quizStore,
  setCurrentQuestion,
  setisTimeOver,
} from '@src/pages/quiz/store';
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

  const handleNextClick = () => {
    if (isLastQuestion) return;

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <Box display='flex' flexDir='column' gap={4} alignItems='start'>
      <Heading size='lg'>
        {`${currentQuestion + 1}` + '. ' + questions[currentQuestion].question}
      </Heading>

      {!isLastQuestion ? (
        <AppBtn onClick={handleNextClick}>Следующий вопрос</AppBtn>
      ) : (
        <LinkBox>
          <AppBtn onClick={() => setisTimeOver(true)}>
            <LinkOverlay as={Link} to={RESULT_ROUTE}>
              Закончить тестирование
            </LinkOverlay>
          </AppBtn>
        </LinkBox>
      )}
    </Box>
  );
};
