import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Center, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { QUIZ_ROUTE } from '@src/routes';
import { AppBtn } from '@src/components/UI/AppBtn';
import { Content, Header, Wrapper } from '@src/components';
import { setisTimeOver } from '../quiz/store';

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
          <LinkBox>
            <AppBtn onClick={() => setisTimeOver(false)}>
              <LinkOverlay as={Link} to={QUIZ_ROUTE}>
                Начать тестирование
              </LinkOverlay>
            </AppBtn>
          </LinkBox>
        </Center>
      </Content>
    </Wrapper>
  );
};
