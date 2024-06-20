import React, { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useUnit } from 'effector-react';

import {
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { AppBtn } from '@src/components/UI/AppBtn';

import { setUser } from '@src/store';

import { APP_MAIN_ROUTE } from '@src/routes';
import { Wrapper } from '@src/components';

export const Config: FC = () => {
  //   const { user, login = '', pass = '' } = useUnit($appStore);

  const [minutesLimit, setMinutesLimit] = useState<number>(10);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    sessionStorage.removeItem('user');
    setUser(null);

    sessionStorage.setItem(
      'config',
      JSON.stringify({
        minutesLimit,
      }),
    );

    navigate(APP_MAIN_ROUTE);
  };

  return (
    <Wrapper>
      <Stack onSubmit={handleSubmit} as='form'>
        <Heading size='xl'>Конфигурирование теста</Heading>
        <FormControl as='fieldset'>
          <FormLabel fontSize='xl' as='legend'>
            Лимит времени:
          </FormLabel>
          <RadioGroup
            name='minutes_limit'
            onChange={(val) => setMinutesLimit(+val)}
            value={String(minutesLimit)}
          >
            <HStack>
              <Radio value='10' size={'lg'} colorScheme='red'>
                10 минут
              </Radio>
              <Radio value='20' size={'lg'} colorScheme='red'>
                20 минут
              </Radio>
              <Radio value='30' size={'lg'} colorScheme='red'>
                30 минут
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <AppBtn
          //   as={Link}
          //   to={APP_MAIN_ROUTE}
          //   onClick={() => {
          //     sessionStorage.removeItem('user');
          //     setUser(null);

          //     sessionStorage.setItem(
          //       'config',
          //       JSON.stringify({
          //         timeLimit,
          //       }),
          //     );
          //   }}
          type='submit'
        >
          Принять изменения
        </AppBtn>
      </Stack>
    </Wrapper>
  );
};
