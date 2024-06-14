import { QuestionType } from '@src/api/api';
import { createStore, createEvent } from 'effector';

interface QuizStore {
  currentQuestion: number;
  results: [boolean, QuestionType][];
  finishTime: string;
  isTimeOver: boolean;
}

const $quizStore = createStore<QuizStore>({
  currentQuestion: 0,
  results: [],
  finishTime: '',
  isTimeOver: true,
});

const setCurrentQuestion = createEvent<number>();
const setIsTimeOver = createEvent<boolean>();
const setFinishTime = createEvent<string>();

$quizStore.on(setCurrentQuestion, (state, currentQuestion) => ({
  ...state,
  currentQuestion,
}));

$quizStore.on(setIsTimeOver, (state, isTimeOver) => ({
  ...state,
  isTimeOver,
}));

$quizStore.on(setFinishTime, (state, finishTime) => ({
  ...state,
  finishTime,
}));

export { $quizStore, setCurrentQuestion, setIsTimeOver, setFinishTime };
