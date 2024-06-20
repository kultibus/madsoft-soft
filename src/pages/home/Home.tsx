import React, { FC, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { Heading, Input, Stack } from '@chakra-ui/react';
import { AppBtn } from '@src/components/UI/AppBtn';

import { setUser, $appStore, setLogin, setPass } from '@src/store';

import { CONFIG_ROUTE, QUIZ_ROUTE } from '@src/routes';
import { ALLOWED_USERS } from '@src/constants';
import { Wrapper } from '@src/components';

export const Home: FC = () => {
  const { user, login = '', pass = '' } = useUnit($appStore);

  useEffect(() => {
    const userJson = sessionStorage.getItem('user');

    if (!userJson) return;

    const parsedUser: User = JSON.parse(sessionStorage.getItem('user'));

    setUser(parsedUser);
  }, []);

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
            as={Link}
            to={QUIZ_ROUTE}
            onClick={() => {
              //   setTimeLimit(config.minutesLimit * 60000);
              //   setResults([]);
              //   setCurrentQuestion(0);
            }}
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
