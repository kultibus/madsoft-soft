import React, { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface HeaderProps {
  children: ReactNode;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <Box as='header' bg='var(--chakra-colors-blue-200)' h='96px' px={4}>
      {props.children}
    </Box>
  );
};
