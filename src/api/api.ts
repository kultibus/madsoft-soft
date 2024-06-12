import axios from 'axios';

const base = axios.create({
  baseURL: 'https://opentdb.com/api.php',
});

interface MultipleQuestionType {
  type: 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
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

// interface ShortQuestionType {
//   type: 'boolean';
//   difficulty: 'easy' | 'medium' | 'hard';
//   category: string;
//   question: string;
//   correct_answer: 'True' | 'False';
//   incorrect_answers: ('True' | 'False')[];
// }

export type QuestionType = MultipleQuestionType | TrueFalseQuestionType;

export type Questions = QuestionType[];

export const getQuestions = () =>
  base.get<{ results: Questions }>('?amount=10&encode=url3986').then((res) => {
    return res.data.results;
  });
// .catch((e) => []);
