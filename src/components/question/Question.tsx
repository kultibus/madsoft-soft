import React, { FC, FormEvent, useMemo, useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Questions } from '@src/api/api';
import {
  $quizStore,
  setCurrentQuestion,
  setIsTimeOver,
  setResults,
} from '@src/pages/quiz/store';
import { RESULT_ROUTE } from '@src/routes';
import { arrayShuffle } from '@src/utils';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { AppBtn } from '../UI/AppBtn';
import { AppCheckBox } from '../UI';

interface QuestionProps {
  questions: Questions;
}

export const Question: FC<QuestionProps> = (props) => {
  const { questions } = props;
  const { currentQuestion, results } = useUnit($quizStore);
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState<string>('');

  const navigate = useNavigate();

  const {
    question,
    type,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswer,
  } = useMemo(() => {
    return questions[currentQuestion];
  }, [questions, currentQuestion]);

  const answers = useMemo(() => {
    if (type === 'boolean') return null;

    const answers =
      typeof correctAnswer === 'string'
        ? [...incorrectAnswer, correctAnswer]
        : [...correctAnswer, ...incorrectAnswer];

    arrayShuffle(answers);

    return answers.map((answer) => ({
      id: Math.random().toString(36).substring(2, 9),
      answer,
    }));
  }, [correctAnswer, incorrectAnswer, type]);

  const isLastQuestion = useMemo(() => {
    return questions.length - currentQuestion === 1;
  }, [questions, currentQuestion]);

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    switch (type) {
      case 'multiple':
        const correctAnswerArr =
          typeof correctAnswer === 'string'
            ? [correctAnswer]
            : [...correctAnswer];

        const isRightCheckboxAnswer =
          JSON.stringify(
            correctAnswerArr.sort((a, b) => a.localeCompare(b)),
          ) ===
          JSON.stringify(checkboxValues.sort((a, b) => a.localeCompare(b)))
            ? true
            : false;

        setResults([...results, [isRightCheckboxAnswer, question]]);

        break;
      case 'boolean':
        const isRightRadioAnswer =
          radioValue === correctAnswer.toLocaleLowerCase() ? true : false;

        setResults([...results, [isRightRadioAnswer, question]]);

        break;
    }

    setCheckboxValues([]);
    setRadioValue('');

    if (isLastQuestion) {
      setIsTimeOver(true);
      navigate(RESULT_ROUTE);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <Flex
      onSubmit={handleSubmit}
      as='form'
      display='flex'
      direction='column'
      gap={4}
    >
      <FormControl as='fieldset'>
        <FormLabel as='legend' fontSize='x-large'>
          {`${currentQuestion + 1}` + '. ' + question}
        </FormLabel>

        {type === 'multiple' && (
          <Stack>
            {answers.map((a) => (
              <AppCheckBox
                name={question}
                id={a.id}
                key={a.id}
                value={a.answer}
                onChange={(e) => {
                  const target = e.target;
                  if (target.checked) {
                    setCheckboxValues([...checkboxValues, target.value]);
                  } else {
                    setCheckboxValues(
                      checkboxValues.filter((val) => val !== target.value),
                    );
                  }
                }}
              >
                {a.answer}
              </AppCheckBox>
            ))}
          </Stack>
        )}

        {type === 'boolean' && (
          <RadioGroup onChange={setRadioValue} value={radioValue}>
            <Stack>
              <Radio name={question} value='true' size={'lg'}>
                Да
              </Radio>
              <Radio name={question} value='false' size={'lg'}>
                Нет
              </Radio>
            </Stack>
          </RadioGroup>
        )}
      </FormControl>

      <AppBtn type='submit' alignSelf={'start'}>
        {!isLastQuestion ? 'Следующий вопрос' : 'Закончить тестирование'}
      </AppBtn>
    </Flex>
  );
};
