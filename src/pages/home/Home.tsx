import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Center, Heading } from '@chakra-ui/react';
import { QUIZ_ROUTE } from '@src/routes';
import { AppBtn } from '@src/components/UI/AppBtn';
import { Content, Header, Wrapper } from '@src/components';
// import { setisTimeOver } from '../quiz/store';

export const Home: FC = () => {
  return (
    <Wrapper>
      <Header>
        <Center h='100%'>
          <Heading fontWeight={400}>Добро пожаловать на тестирование!</Heading>
        </Center>
      </Header>
      <Content>
        <Center h='100%'>
          {/* <AppBtn onClick={() => setisTimeOver(false)}> */}
          <AppBtn>
            <Link to={QUIZ_ROUTE}>Начать тестирование</Link>
          </AppBtn>
        </Center>
      </Content>
    </Wrapper>
  );
};
