import { Center, Container, Spinner } from '@chakra-ui/react';
import { Question } from '@src/components/question/Question';
import { Stepper } from '@src/components/stepper/Stepper';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { getQuestions } from '@src/api/api';

export const Quiz: FC = () => {
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
      <Stepper questions={questions} />
      <Question questions={questions} />
    </Container>
  );
};
