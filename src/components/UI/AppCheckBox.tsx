import React, { FC, ReactNode } from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';

interface AppCheckBoxProps extends CheckboxProps {
  children: ReactNode;
}

export const AppCheckBox: FC<AppCheckBoxProps> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Checkbox size='lg' colorScheme='red' {...restProps}>
      {children}
    </Checkbox>
  );
};
