interface UserType {
  login: string;
  pass: string;
  role: 'configurator' | 'student';
}

declare type User = UserType | null;

declare interface TestConfig {
  minutesLimit: number;
}
