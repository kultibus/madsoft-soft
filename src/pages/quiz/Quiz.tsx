import React, { FC, useEffect } from 'react';
import { Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { getQuestions } from '@src/api/api';
import { Content, Header, Question, Stepper, Wrapper } from '@src/components';
import { Timer } from '@src/components/timer';
import { useQuery } from '@tanstack/react-query';
// import { useUnit } from 'effector-react';
import {
  //  $quizStore,
  setDeadline,
  // setElapsedTime,
  // setResults
} from './store';
// import { Navigate } from 'react-router-dom';
// import { RESULT_ROUTE } from '@src/routes';

export const Quiz: FC = () => {
  //   const { isTimeOver, deadline } = useUnit($quizStore);

  //   useEffect(() => {
  //     const startTime = Date.now();

  //     setResults([]);

  //     return () => {
  //       setElapsedTime(Date.now() - startTime);
  //     };
  //   }, []);

  //   console.log(deadline);

  const { data: questions = [], isLoading: isQuestionsLoading } = useQuery({
    queryKey: ['random-questions'],
    queryFn: () => getQuestions(),
  });

  useEffect(() => {
    setDeadline(0.1 * 60000);

    return () => {
      setDeadline(null);
    };
  }, []);

  if (isQuestionsLoading)
    return (
      <Center w='100%' h='100vh'>
        <Spinner />
      </Center>
    );

  //   if (isTimeOver) return <Navigate to={RESULT_ROUTE} />;

  return (
    <Wrapper>
      <Header>
        <Flex
          h={'100%'}
          alignItems='center'
          justifyContent={'space-between'}
          py={'16px'}
        >
          <Heading size='xl' fontWeight={400}>
            Тестирование
          </Heading>
          <Timer />
        </Flex>
      </Header>
      <Content>
        <Flex direction={'column'} gap={4}>
          <Stepper questions={questions} />
          <Question questions={questions} />
        </Flex>
      </Content>
    </Wrapper>
  );
};
