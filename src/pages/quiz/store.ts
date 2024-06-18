// import { QuestionType } from '@src/api/api';
import { createStore, createEvent } from 'effector';

interface QuizStore {
  currentQuestion: number;
  //   results: [boolean, QuestionType][];
  results: [boolean | string, string][];
  elapsedTime: number;
  isTimeOver: boolean;
  deadline: number | null; // rename elapsedTime
}

const $quizStore = createStore<QuizStore>({
  currentQuestion: 0,
  results: [],
  elapsedTime: 0,
  isTimeOver: true,
  deadline: null,
});

const setCurrentQuestion = createEvent<number>();
const setIsTimeOver = createEvent<boolean>();
const setElapsedTime = createEvent<number>();
const setResults = createEvent<[boolean | string, string][]>();
const setDeadline = createEvent<number | null>();

$quizStore
  .on(setCurrentQuestion, (state, currentQuestion) => ({
    ...state,
    currentQuestion,
  }))
  .on(setDeadline, (state, deadline) => ({
    ...state,
    deadline,
  }));

$quizStore.on(setIsTimeOver, (state, isTimeOver) => ({
  ...state,
  isTimeOver,
}));

$quizStore.on(setElapsedTime, (state, elapsedTime) => ({
  ...state,
  elapsedTime,
}));

$quizStore.on(setResults, (state, results) => ({
  ...state,
  results,
}));

export {
  $quizStore,
  setCurrentQuestion,
  setIsTimeOver,
  setElapsedTime,
  setResults,
  setDeadline,
};
