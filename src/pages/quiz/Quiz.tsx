import React, { FC, useEffect, useMemo } from 'react';
import { Center, HStack, Heading, Spinner, Stack } from '@chakra-ui/react';
import { getQuestions } from '@src/api/api';
import { Question, Stepper, Wrapper } from '@src/components';
import { Timer } from '@src/components/timer';
import { useQuery } from '@tanstack/react-query';
import { useUnit } from 'effector-react';
import {
  $quizStore,
  setCurrentQuestion,
  setResults,
  setTimeLimit,
} from './store';
import { Navigate } from 'react-router-dom';
import { APP_MAIN_ROUTE, RESULT_ROUTE } from '@src/routes';

export const Quiz: FC = () => {
  const { timeLimit } = useUnit($quizStore);

  const { data: questions = [], isLoading: isQuestionsLoading } = useQuery({
    queryKey: ['random-questions'],
    queryFn: () => getQuestions(),
  });

  useEffect(() => {
    const timeLimitParsed = JSON.parse(sessionStorage.getItem('timeLimit'));
    const sessionStateParsed: SessionState = JSON.parse(
      sessionStorage.getItem('sessionState'),
    );

    if (!!timeLimitParsed && !!sessionStateParsed) {
      setTimeLimit(timeLimitParsed);
      setCurrentQuestion(sessionStateParsed.currentQuestion);
      setResults(sessionStateParsed.results);
      return;
    }

    const parcedConfig: TestConfig = JSON.parse(
      sessionStorage.getItem('config'),
    );

    setTimeLimit(parcedConfig.minutesLimit * 60000);
  }, []);

  const filteredAndShuffledQuestions = useMemo(() => {
    const configParsed: TestConfig = JSON.parse(
      sessionStorage.getItem('config'),
    );

    return questions.filter((q) => {
      return configParsed.questionTypes[q.type];
    });
  }, [questions]);

  if (isQuestionsLoading)
    return (
      <Center w='100%' h='100vh'>
        <Spinner size='md' />
      </Center>
    );

  if (timeLimit === 0) {
    sessionStorage.removeItem('isTesting');
    sessionStorage.setItem('isResult', 'true');
    return <Navigate to={RESULT_ROUTE} />;
  }

  if (!sessionStorage.getItem('isTesting'))
    return <Navigate to={APP_MAIN_ROUTE} />;

  if (sessionStorage.getItem('isResult')) return <Navigate to={RESULT_ROUTE} />;

  return (
    <Wrapper>
      <Stack flexBasis='80%'>
        <HStack>
          <Heading size='xl'>Тестирование</Heading>
          <Timer />
        </HStack>
        <Stack>
          <Stepper questions={filteredAndShuffledQuestions} />
          <Question questions={filteredAndShuffledQuestions} />
        </Stack>
      </Stack>
    </Wrapper>
  );
};
