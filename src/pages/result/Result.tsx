import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Center, Heading } from '@chakra-ui/react';
import { APP_MAIN_ROUTE } from '@src/routes';
import { setCurrentQuestion } from '../quiz/store';
import { Content, Header, Wrapper } from '@src/components';
import { AppBtn } from '@src/components/UI/AppBtn';

export const Result: FC = () => {
  return (
    <Wrapper>
      <Header>
        <Center h={'100%'}>
          <Heading fontWeight={400}>Тестирование окончено!</Heading>
        </Center>
      </Header>

      <Content>
        <Center h='100%'>
          <AppBtn onClick={() => setCurrentQuestion(0)}>
            <Link to={APP_MAIN_ROUTE}>Пройти ещё раз</Link>
          </AppBtn>
        </Center>
      </Content>
    </Wrapper>
  );
};
