import React, { FC, ReactNode } from 'react';
import { Center, Container } from '@chakra-ui/react';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = (props) => {
  return (
    <Container colorScheme={'red'} maxW='1920px' h='100vh'>
      <Center h='100%' w='100%'>
        {props.children}
      </Center>
    </Container>
  );
};
