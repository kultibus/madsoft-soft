import React, { FC } from 'react';
import { Container, Center, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '@src/api/api';
import { $quizStore } from './store';
import { useUnit } from 'effector-react';
import { Question } from '@src/components/question/Question';
import { Stepper } from '@src/components/stepper/Stepper';

export const Quiz: FC = () => {
  const { currentQuestion } = useUnit($quizStore);

  const { data: questions = [], isLoading: isQuestionsLoading } = useQuery({
    queryKey: ['random-questions'],
    queryFn: () => getQuestions(),
  });

  if (isQuestionsLoading)
    return (
      <Center w='100%' h='100vh'>
        <Spinner />
      </Center>
    );

  return (
    <Container display='flex' flexDir='column' maxW='1920px' h='100vh' px={0}>
      <Stepper />
      <Question {...questions[currentQuestion]} />
    </Container>
  );
};
