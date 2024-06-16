import React, { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface ContentProps {
  children: ReactNode;
}

export const Content: FC<ContentProps> = (props) => {
  return (
    <Box px={4} py={4} bg='var(--chakra-colors-gray-400)' flexGrow={1}>
      {props.children}
    </Box>
  );
};