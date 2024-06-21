# Приложение для тестирования

[Деплой сборки на GH Pages](https://kultibus.github.io/madsoft-soft)

## Мануал

### Для авторизации в приложении замоканы два пользователя:

#### конфигуратор:

- логин: user1
- пароль: user1pass

#### студент:

- логин: user2
- пароль: user2pass

### В зависимости от роли пользователя после авторизации доступны режимы:

- конфигурирование теста 
- тестирование (login: 'user2', pass: 'user2pass')

<!-- В режиме конфигурирования доступно -->

### Локальный запуск:

- yarn
- yarn start

## Стек:

- React/TypeScript
- Effector/TanstackQuery/Axios
- Chakra UI
- Webpack