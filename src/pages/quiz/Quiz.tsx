import { Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { getQuestions } from '@src/api/api';
import { Content, Header, Question, Stepper, Wrapper } from '@src/components';
import { Timer } from '@src/components/timer';
import { useQuery } from '@tanstack/react-query';
// import { useUnit } from 'effector-react';
import React, { FC } from 'react';
// import { $quizStore, setisTimeOver } from './store';
// import { useNavigate } from 'react-router-dom';
// import { APP_MAIN_ROUTE, RESULT_ROUTE } from '@src/routes';

export const Quiz: FC = () => {
  //   const { isTimeOver } = useUnit($quizStore);

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     setisTimeOver(false);
  //   }, []);

  //   useEffect(() => {
  //     if (isTimeOver) navigate(RESULT_ROUTE);
  //   }, [isTimeOver]);

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
