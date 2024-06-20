export const ALLOWED_USERS = {
  user1: { pass: 'user1pass', role: 'configurator' },
  user2: { pass: 'user2pass', role: 'student' },
};

export const DEFAULT_MINUTES_LIMIT = 10;

export const DEFAULT_QUESTION_TYPES: QuestonTypes[] = [
  { multiple: 'Выбор из нескольких вариантов ответа' },
  { boolean: 'Выбор одного ответа' },
  { short: 'Короткий ответ' },
  { detailed: 'Развёрнутый ответ' },
];
