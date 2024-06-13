import { Box, Button, Heading } from '@chakra-ui/react';
import { Questions } from '@src/api/api';
import { $quizStore, setCurrentQuestion } from '@src/pages/quiz/store';
import { RESULT_ROUTE } from '@src/routes';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface QuestionProps {
  questions: Questions;
}

export const Question: FC<QuestionProps> = (props) => {
  const { questions } = props;

  const { currentQuestion } = useUnit($quizStore);

  const isLastQuestion = questions.length - currentQuestion === 1;

  const handleClick = () => {
    if (isLastQuestion) return;

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <Box>
      <Heading>
        {`${currentQuestion + 1}` + '. ' + questions[currentQuestion].question}
      </Heading>

      {!isLastQuestion ? (
        <Button onClick={handleClick}>Следующий вопрос</Button>
      ) : (
        <Button as={Link} to={RESULT_ROUTE}>
          Закончить тестирование
        </Button>
      )}
    </Box>
  );
};
