import React, { FC, FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { AppBtn } from '@src/components/UI/AppBtn';

import { $appStore, setUser } from '@src/store';

import { APP_MAIN_ROUTE } from '@src/routes';
import { AppCheckBox, Wrapper } from '@src/components';
import { useUnit } from 'effector-react';
import { DEFAULT_QUESTION_TYPES } from '@src/constants';

export const Config: FC = () => {
  const { user } = useUnit($appStore);

  const [minutesLimit, setMinutesLimit] = useState<number>(10);
  const [questionTypes, setQuestionTypes] = useState(DEFAULT_QUESTION_TYPES);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!questionTypes.length) return;

    sessionStorage.removeItem('user');
    setUser(null);

    sessionStorage.setItem(
      'config',
      JSON.stringify({
        minutesLimit,
        questionTypes: questionTypes
          .map((q) => Object.entries(q)[0])
          .reduce((acc, i) => {
            acc[i[0]] = true;
            return acc;
          }, {}),
      }),
    );

    navigate(APP_MAIN_ROUTE);
  };

  if (user?.role !== 'configurator') {
    return <Navigate to={APP_MAIN_ROUTE} />;
  }

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
        <FormControl isInvalid={!questionTypes.length} as='fieldset'>
          <FormLabel fontSize='xl' as='legend'>
            Типы вопросов:
          </FormLabel>
          <Stack>
            {DEFAULT_QUESTION_TYPES.map((q) => Object.entries(q)[0]).map(
              (q) => (
                <AppCheckBox
                  defaultChecked
                  name='questions'
                  id={q[0]}
                  key={q[0]}
                  value={q[0]}
                  onChange={(e) => {
                    const target = e.target;
                    if (!target.checked) {
                      setQuestionTypes([
                        ...questionTypes.filter(
                          (q) => q[target.value] === q[0],
                        ),
                      ]);
                    } else {
                      setQuestionTypes([
                        ...questionTypes,
                        DEFAULT_QUESTION_TYPES.find((q) => q[target.value]),
                      ]);
                    }
                  }}
                >
                  {q[1]}
                </AppCheckBox>
              ),
            )}
          </Stack>
          {!questionTypes.length && (
            <FormErrorMessage fontSize='lg'>
              Выберите хотя бы один тип вопроса
            </FormErrorMessage>
          )}
        </FormControl>

        <AppBtn type='submit'>Принять изменения</AppBtn>
      </Stack>
    </Wrapper>
  );
};
