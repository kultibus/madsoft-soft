import React, { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface HeaderProps {
  children: ReactNode;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <Box
      as='header'
      //   flexShrink={0}
      //   fontSize={32}
      //   lineHeight='32px'
      //   fontWeight={600}
      bg='var(--chakra-colors-blue-200)'
      h='96px'
      //   py={8}
      px={4}
      //   w='100%'
    >
      {props.children}
    </Box>
  );
};
