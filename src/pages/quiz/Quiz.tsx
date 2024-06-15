import React, { FC, useEffect } from 'react';
import { Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { getQuestions } from '@src/api/api';
import { Content, Header, Question, Stepper, Wrapper } from '@src/components';
import { Timer } from '@src/components/timer';
import { useQuery } from '@tanstack/react-query';
import { useUnit } from 'effector-react';
import { $quizStore, setElapsedTime } from './store';
import { Navigate } from 'react-router-dom';
import { RESULT_ROUTE } from '@src/routes';

export const Quiz: FC = () => {
  const { isTimeOver } = useUnit($quizStore);

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      setElapsedTime(Date.now() - startTime);
    };
  }, []);

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

  if (isTimeOver) return <Navigate to={RESULT_ROUTE} />;

  return (
    <Wrapper>
      <Header>
        <Flex
          h={'100%'}
          alignItems='center'
          justifyContent={'space-between'}
          py={'16px'}
        >
          <Heading fontWeight={400}>Тестирование</Heading>
          <Timer />
        </Flex>
      </Header>
      <Content>
        <Stepper questions={questions} />
        <Question questions={questions} />
      </Content>
    </Wrapper>
  );
};
