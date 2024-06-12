import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container, Center, Button } from '@chakra-ui/react';
import { QUIZ_ROUTE } from '@src/routes';

export const Home: FC = () => {
  return (
    <Container display='flex' flexDir='column' maxW='1920px' h='100vh' px={0}>
      <Center
        flexShrink={0}
        fontSize={32}
        lineHeight='32px'
        fontWeight={600}
        bg='var(--chakra-colors-blue-200)'
        w='100%'
        p={8}
      >
        Добро пожаловать на тестирование!
      </Center>
      <Center flexGrow={1}>
        <Button as={Link} to={QUIZ_ROUTE} colorScheme='blue'>
          Начать тестирование
        </Button>
      </Center>
    </Container>
  );
};
