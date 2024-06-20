import { HStack, Heading, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { AppBtn } from '@src/components/UI/AppBtn';
import { APP_MAIN_ROUTE, QUIZ_ROUTE } from '@src/routes';
import { useUnit } from 'effector-react';
import React, { FC, useId } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { $quizStore } from '../quiz/store';
import { Wrapper } from '@src/components';
import { formatTime } from '@src/components/timer/utils';

export const Result: FC = () => {
  const { results, timeLimit } = useUnit($quizStore);

  const parcedConfig: TestConfig = JSON.parse(sessionStorage.getItem('config'));

  if (sessionStorage.getItem('isTesting')) return <Navigate to={QUIZ_ROUTE} />;
  if (!sessionStorage.getItem('isResult'))
    return <Navigate to={APP_MAIN_ROUTE} />;

  return (
    <Wrapper>
      <Stack>
        <Heading size='xl'>Тестирование закончено!</Heading>

        <Stack fontSize='xl'>
          <HStack>
            <Text>Время выполнения: </Text>
            <Text>
              {formatTime(
                new Date(parcedConfig.minutesLimit * 60000 - timeLimit),
              )}
            </Text>
          </HStack>
          <Text>Результаты:</Text>
          <List>
            {results.map((r, i) => (
              <ListItem
                key={useId()} // eslint-disable-line react-hooks/rules-of-hooks
              >
                {i + 1}:{' '}
                {typeof r[0] !== 'boolean'
                  ? r[0] || 'Не заполнено'
                  : r[0]
                  ? 'Верно'
                  : 'Неверно'}
              </ListItem>
            ))}
          </List>
          <AppBtn
            onClick={() => {
              sessionStorage.removeItem('timeLimit');
              sessionStorage.removeItem('isResult');
              sessionStorage.removeItem('sessionState');
            }}
            as={Link}
            to={APP_MAIN_ROUTE}
          >
            Пройти ещё раз
          </AppBtn>
        </Stack>
      </Stack>
    </Wrapper>
  );
};
