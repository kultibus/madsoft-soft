import { QuestionType } from '@src/api/api';
import { createStore, createEvent } from 'effector';

interface QuizStore {
  currentQuestion: number;
  results: [boolean, QuestionType][];
}

const $quizStore = createStore<QuizStore>({
  currentQuestion: 0,
  results: [],
});

const setCurrentQuestion = createEvent<number>();

$quizStore.on(setCurrentQuestion, (state, currentQuestion) => ({
  ...state,
  currentQuestion,
}));

export { $quizStore, setCurrentQuestion };
