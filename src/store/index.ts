import { createStore, createEvent } from 'effector';

interface AppStore {
  user: User;
  login?: string;
  pass?: string;
  config?: TestConfig;
}

const $appStore = createStore<AppStore>({
  user: null,
  config: {
    minutesLimit: 10,
  },
});

const setUser = createEvent<User>();
const setLogin = createEvent<string>();
const setPass = createEvent<string>();
const setConfig = createEvent<TestConfig>();

$appStore
  .on(setUser, (state, user) => ({ ...state, user }))
  .on(setLogin, (state, login) => ({ ...state, login }))
  .on(setPass, (state, pass) => ({ ...state, pass }))
  .on(setConfig, (state, config) => ({ ...state, config }));

export { $appStore, setUser, setLogin, setPass, setConfig };
