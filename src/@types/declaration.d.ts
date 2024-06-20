interface UserType {
  login: string;
  pass: string;
  role: 'configurator' | 'student';
}

declare type User = UserType | null;

declare type QuizResults = [boolean | string, string][];

declare interface SessionState {
  currentQuestion: number;
  results: QuizResults;
}

declare type QuestonTypes =
  | { multiple: string }
  | { boolean: string }
  | { short: string }
  | { detailed: string };

declare interface TestConfig {
  minutesLimit: number;
  questionTypes: QuestonTypes;
}
