import { Button, ButtonProps } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface AppBtnProps extends ButtonProps {
  // interface AppBtnProps extends _chakra_ui_system.ComponentWithAs<"button", ButtonProps> {
  children: ReactNode;
}

export const AppLink: FC<AppBtnProps> = (props) => {
  const { children, ...rest } = props;

  return <Button {...rest}>{children}</Button>;
};
