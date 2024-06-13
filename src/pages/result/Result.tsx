import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container, Center, Button } from '@chakra-ui/react';
import { APP_MAIN_ROUTE } from '@src/routes';
import { setCurrentQuestion } from '../quiz/store';

export const Result: FC = () => {
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
        Тестирование окончено!
      </Center>
      <Center flexGrow={1}>
        <Button
          onClick={() => setCurrentQuestion(0)}
          as={Link}
          to={APP_MAIN_ROUTE}
          colorScheme='blue'
        >
          Пройти ещё раз
        </Button>
      </Center>
    </Container>
  );
};
