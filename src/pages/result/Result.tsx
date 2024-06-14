import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { APP_MAIN_ROUTE } from '@src/routes';
import { $quizStore, setCurrentQuestion } from '../quiz/store';
import { Content, Header, Wrapper } from '@src/components';
import { AppBtn } from '@src/components/UI/AppBtn';
import { useUnit } from 'effector-react';

export const Result: FC = () => {
  const { finishTime } = useUnit($quizStore);

  return (
    <Wrapper>
      <Header>
        <Center h={'100%'}>
          <Heading fontWeight={400}>Тестирование окончено!</Heading>
        </Center>
      </Header>

      <Content>
        <Center h='100%'>
          <Flex direction={'column'} gap={2}>
            <Flex fontWeight={400} fontSize={'larger'} gap={2}>
              <Text>Время выполнения: </Text>
              <Text>{finishTime}</Text>
            </Flex>
            <LinkBox>
              <AppBtn onClick={() => setCurrentQuestion(0)}>
                <LinkOverlay as={Link} to={APP_MAIN_ROUTE}>
                  Пройти ещё раз
                </LinkOverlay>
              </AppBtn>
            </LinkBox>
          </Flex>
        </Center>
      </Content>
    </Wrapper>
  );
};
