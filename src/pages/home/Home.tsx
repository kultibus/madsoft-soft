import React, { FC, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { Heading, Input, Stack } from '@chakra-ui/react';
import { AppBtn } from '@src/components/UI/AppBtn';

import { setUser, $appStore, setLogin, setPass } from '@src/store';

import { CONFIG_ROUTE, QUIZ_ROUTE, RESULT_ROUTE } from '@src/routes';
import {
  ALLOWED_USERS,
  DEFAULT_MINUTES_LIMIT,
  DEFAULT_QUESTION_TYPES,
} from '@src/constants';
import { Wrapper } from '@src/components';
import { setCurrentQuestion, setResults, setTimeLimit } from '../quiz/store';

export const Home: FC = () => {
  const { user, login = '', pass = '' } = useUnit($appStore);

  useEffect(() => {
    const userJson = sessionStorage.getItem('user');

    if (!userJson) return;

    const parsedUser: User = JSON.parse(sessionStorage.getItem('user'));

    setUser(parsedUser);

    setTimeLimit(null);
    setCurrentQuestion(0);
    setResults([]);
  }, []);

  useEffect(() => {
    const parcedConfig: TestConfig = JSON.parse(
      sessionStorage.getItem('config'),
    );

    if (!parcedConfig) {
      sessionStorage.setItem(
        'config',
        JSON.stringify({
          minutesLimit: DEFAULT_MINUTES_LIMIT,
          questionTypes: DEFAULT_QUESTION_TYPES.reduce((acc, i) => {
            acc[Object.entries(i)[0][0]] = Object.entries(i)[1][1];

            return acc;
          }, {}),
        }),
      );
      return;
    }
  }, [user]);

  if (sessionStorage.getItem('isTesting')) return <Navigate to={QUIZ_ROUTE} />;
  if (sessionStorage.getItem('isResult')) return <Navigate to={RESULT_ROUTE} />;

  return (
    <Wrapper>
      {!user ? (
        <Stack>
          <Heading size='xl'>Вход в систему тестирования</Heading>
          <Input
            focusBorderColor='gray.500'
            size={'lg'}
            placeholder='Логин'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            focusBorderColor='gray.500'
            size={'lg'}
            placeholder='Пароль'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <AppBtn
            onClick={() => {
              if (!login?.trim().length || !pass?.trim()) return;

              if (
                ALLOWED_USERS[login] !== login &&
                ALLOWED_USERS[login]?.pass !== pass
              ) {
                alert('Неверный логин или пароль');

                return;
              }

              sessionStorage.setItem(
                'user',
                JSON.stringify({
                  login,
                  pass,
                  role: ALLOWED_USERS[login].role,
                }),
              );

              setUser({ login, pass, role: ALLOWED_USERS[login].role });
            }}
          >
            Войти
          </AppBtn>
        </Stack>
      ) : user.role === 'configurator' ? (
        <Navigate to={CONFIG_ROUTE} />
      ) : (
        <Stack>
          <Heading size='xl'>Добро пожаловать!</Heading>
          <AppBtn
            onClick={() => {
              sessionStorage.setItem('isTesting', 'true');
            }}
            as={Link}
            to={QUIZ_ROUTE}
          >
            Начать тестирование
          </AppBtn>
          <AppBtn
            onClick={() => {
              sessionStorage.removeItem('user');

              setUser(null);
            }}
          >
            Выйти
          </AppBtn>
        </Stack>
      )}
    </Wrapper>
  );
};
