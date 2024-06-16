import {
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Content, Header, Wrapper } from '@src/components';
import { AppBtn } from '@src/components/UI/AppBtn';
import { APP_MAIN_ROUTE } from '@src/routes';
import { useUnit } from 'effector-react';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { $quizStore, setCurrentQuestion } from '../quiz/store';

export const Result: FC = () => {
  const { elapsedTime, results } = useUnit($quizStore);

  const { minutes, seconds } = useMemo(() => {
    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);

    return { minutes, seconds };
  }, [elapsedTime]);

  return (
    <Wrapper>
      <Header>
        <Center h={'100%'}>
          <Heading size='xl' fontWeight={400}>
            Тестирование окончено!
          </Heading>
        </Center>
      </Header>

      <Content>
        <Center h='100%' fontWeight={400} fontSize={'larger'}>
          <Stack>
            <Flex gap={2}>
              <Text>Время выполнения: </Text>
              <Text>
                {minutes > 9 ? minutes : '0' + minutes}:
                {seconds > 9 ? seconds : '0' + seconds}
              </Text>
            </Flex>
            <Text>Результаты:</Text>
            <List>
              {results.map((r, i) => (
                <ListItem key={i}>
                  {i + 1}: {r[0] ? 'Верно' : 'Неверно'}
                </ListItem>
              ))}
            </List>
            <LinkBox>
              <AppBtn onClick={() => setCurrentQuestion(0)}>
                <LinkOverlay as={Link} to={APP_MAIN_ROUTE}>
                  Пройти ещё раз
                </LinkOverlay>
              </AppBtn>
            </LinkBox>
          </Stack>
        </Center>
      </Content>
    </Wrapper>
  );
};
