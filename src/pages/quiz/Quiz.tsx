import React, { FC } from 'react';
import { Center, HStack, Heading, Spinner, Stack } from '@chakra-ui/react';
import { getQuestions } from '@src/api/api';
import { Question, Stepper, Wrapper } from '@src/components';
import { Timer } from '@src/components/timer';
import { useQuery } from '@tanstack/react-query';
// import { useUnit } from 'effector-react';
// import { $quizStore, setCurrentQuestion, setTimeLimit } from './store';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { RESULT_ROUTE } from '@src/routes';
// import { $appStore } from '@src/store';

export const Quiz: FC = () => {
  //   const { timeLimit, currentQuestion, results } = useUnit($quizStore);

  //   const navigate = useNavigate();

  const { data: questions = [], isLoading: isQuestionsLoading } = useQuery({
    queryKey: ['random-questions'],
    queryFn: () => getQuestions(),
  });

  if (isQuestionsLoading)
    return (
      <Center w='100%' h='100vh'>
        <Spinner size='md' />
      </Center>
    );

  //   if (!timeLimit) return <Navigate to={RESULT_ROUTE} />;

  return (
    <Wrapper>
      <Stack flexBasis='80%'>
        <HStack>
          <Heading size='xl'>Тестирование</Heading>
          <Timer />
        </HStack>
        <Stack>
          <Stepper questions={questions} />
          <Question questions={questions} />
        </Stack>
      </Stack>
    </Wrapper>
  );
};
