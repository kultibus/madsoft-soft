import { createStore, createEvent } from 'effector';

interface QuizStore {
  currentQuestion: number;
  results: QuizResults;
  timeLimit: number | null;
}

const $quizStore = createStore<QuizStore>({
  currentQuestion: 0,
  results: [],
  timeLimit: null,
});

const setCurrentQuestion = createEvent<number>();
const setResults = createEvent<QuizResults>();
const setTimeLimit = createEvent<number | null>();

$quizStore
  .on(setCurrentQuestion, (state, currentQuestion) => ({
    ...state,
    currentQuestion,
  }))
  .on(setTimeLimit, (state, timeLimit) => ({
    ...state,
    timeLimit,
  }))
  .on(setResults, (state, results) => ({
    ...state,
    results,
  }));

export { $quizStore, setCurrentQuestion, setResults, setTimeLimit };
