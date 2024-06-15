import { QuestionType } from '@src/api/api';
import { createStore, createEvent } from 'effector';

interface QuizStore {
  currentQuestion: number;
  results: [boolean, QuestionType][];
  elapsedTime: number;
  isTimeOver: boolean;
}

const $quizStore = createStore<QuizStore>({
  currentQuestion: 0,
  results: [],
  elapsedTime: 0,
  isTimeOver: true,
});

const setCurrentQuestion = createEvent<number>();
const setIsTimeOver = createEvent<boolean>();
const setElapsedTime = createEvent<number>();

$quizStore.on(setCurrentQuestion, (state, currentQuestion) => ({
  ...state,
  currentQuestion,
}));

$quizStore.on(setIsTimeOver, (state, isTimeOver) => ({
  ...state,
  isTimeOver,
}));

$quizStore.on(setElapsedTime, (state, elapsedTime) => ({
  ...state,
  elapsedTime,
}));

export { $quizStore, setCurrentQuestion, setIsTimeOver, setElapsedTime };
