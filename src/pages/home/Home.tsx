import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { Center, Container, Heading, Input, Stack } from '@chakra-ui/react';
import { AppBtn } from '@src/components/UI/AppBtn';

import { setIsTimeOver } from '../quiz/store';
import { setUser, $appStore, setLogin, setPass } from '@src/store';

import { QUIZ_ROUTE } from '@src/routes';
import { ALLOWED_USERS } from '@src/constants';

export const Home: FC = () => {
  const { user, login = '', pass = '' } = useUnit($appStore);

  useEffect(() => {
    const userJson = sessionStorage.getItem('user');

    if (!userJson) return;

    const parsedUser: User = JSON.parse(sessionStorage.getItem('user'));

    setUser(parsedUser);
  }, []);

  return (
    <Container maxW='1920px' h='100vh'>
      <Center h='100%' w='100%'>
        {!user ? (
          <Stack>
            <Input
              size={'lg'}
              placeholder='Логин'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <Input
              size={'lg'}
              placeholder='Пароль'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <AppBtn
              onClick={() => {
                if (!login?.trim().length || !pass?.trim()) return;

                if (
                  !ALLOWED_USERS[login] &&
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
        ) : (
          <Stack alignItems='center'>
            <Heading px={4} size='xl' fontWeight={400}>
              Добро пожаловать на тестирование!
            </Heading>
            {user.role === 'configurator' ? (
              <AppBtn w='fit-content' as={Link} to={QUIZ_ROUTE}>
                Кофигурировать тест
              </AppBtn>
            ) : (
              <AppBtn
                w='fit-content'
                as={Link}
                to={QUIZ_ROUTE}
                onClick={() => {
                  setIsTimeOver(false);
                }}
              >
                Начать тестирование
              </AppBtn>
            )}

            <AppBtn
              w='fit-content'
              onClick={() => {
                sessionStorage.removeItem('user');

                setUser(null);
              }}
            >
              Выйти
            </AppBtn>
          </Stack>
        )}
      </Center>
    </Container>
  );
};
