import axios from 'axios';

const URL = 'questions.json';

interface MultipleQuestionType {
  type: 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string | string[];
  incorrect_answers: string[];
}

interface TrueFalseQuestionType {
  type: 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: 'True' | 'False';
  incorrect_answers: ('True' | 'False')[];
}

interface ShortQuestionType {
  type: 'short';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: null;
}

interface DetailedQuestionType {
  type: 'detailed';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: null;
}

export type QuestionType =
  | MultipleQuestionType
  | TrueFalseQuestionType
  | ShortQuestionType
  | DetailedQuestionType;

export type Questions = QuestionType[];

export const getQuestions = () =>
  axios.get<Questions>(URL).then((res) => res.data);
