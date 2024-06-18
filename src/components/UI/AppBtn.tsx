import { Button, ButtonProps } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

interface AppBtnProps extends ButtonProps {
  children: ReactNode;
  to?: LinkProps['to'];
}

export const AppBtn: FC<AppBtnProps> = (props) => {
  const { children, to, ...rest } = props;

  return (
    <Button display={'flex'} size='lg' to={to} colorScheme='red' {...rest}>
      {children}
    </Button>
  );
};
