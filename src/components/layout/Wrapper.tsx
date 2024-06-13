import React, { FC, ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = (props) => {
  return (
    <Container display='flex' flexDir='column' maxW='1920px' h='100vh' px={0}>
      {props.children}
    </Container>
  );
};
