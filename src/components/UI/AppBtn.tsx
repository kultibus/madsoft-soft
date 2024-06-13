import { Button, ButtonProps } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface AppBtnProps extends ButtonProps {
  children: ReactNode;
}

export const AppBtn: FC<AppBtnProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Button size='lg' colorScheme='blue' {...rest}>
      {children}
    </Button>
  );
};
