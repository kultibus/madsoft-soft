import { createStore, createEvent } from 'effector';

interface AppStore {
  user: User;
  login?: string;
  pass?: string;
}

const $appStore = createStore<AppStore>({
  user: null,
});

const setUser = createEvent<User>();
const setLogin = createEvent<string>();
const setPass = createEvent<string>();

$appStore
  .on(setUser, (state, user) => ({ ...state, user }))
  .on(setLogin, (state, login) => ({ ...state, login }))
  .on(setPass, (state, pass) => ({ ...state, pass }));

export { $appStore, setUser, setLogin, setPass };
