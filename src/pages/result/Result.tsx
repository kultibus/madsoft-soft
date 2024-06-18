import {
  Center,
  Flex,
  Heading,
  //   LinkBox,
  //   LinkOverlay,
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
                  {/* {i + 1}: {r[0] ? 'Верно' : 'Неверно'} */}
                  {i + 1}:{' '}
                  {typeof r[0] !== 'boolean'
                    ? r[0]
                    : r[0]
                    ? 'Верно'
                    : 'Неверно'}
                </ListItem>
              ))}
            </List>
            <AppBtn
              as={Link}
              to={APP_MAIN_ROUTE}
              onClick={() => setCurrentQuestion(0)}
            >
              Пройти ещё раз
            </AppBtn>
          </Stack>
        </Center>
      </Content>
    </Wrapper>
  );
};
