import { QuestionType } from '@src/api/api';
import { createStore, createEvent } from 'effector';

interface QuizStore {
  currentQuestion: number;
  results: [boolean, QuestionType][];
  isTimeOver: boolean;
}

const $quizStore = createStore<QuizStore>({
  currentQuestion: 0,
  results: [],
  isTimeOver: true,
});

const setCurrentQuestion = createEvent<number>();
const setisTimeOver = createEvent<boolean>();

$quizStore.on(setCurrentQuestion, (state, currentQuestion) => ({
  ...state,
  currentQuestion,
}));

$quizStore.on(setisTimeOver, (state, isTimeOver) => ({
  ...state,
  isTimeOver,
}));

export { $quizStore, setCurrentQuestion, setisTimeOver };
