# Green API Max

Веб-мессенджер, работающий через [GREEN-API](https://green-api.com/) — сервис, позволяющий отправлять и получать сообщения WhatsApp, используя `idInstance` и `tokenInstance` вашего инстанса.

## Возможности

- 🔐 **Авторизация по инстансу** — вход по `idInstance` и `tokenInstance` (данные сохраняются в `localStorage`)
- 💬 **Создание чатов** — ввод номера телефона в формате `7XXXXXXXXXX` для создания нового чата (номер проверяется через API)
- 📨 **Отправка сообщений** — отправка текстовых сообщений в выбранный чат
- 📥 **Получение сообщений** — автоматический опрос сервера (`receiveNotification`) каждые 5 секунд для получения входящих и исходящих сообщений
- 📑 **История чатов** — список ранее созданных чатов сохраняется в `localStorage` и доступен при следующем входе
- ➖ **Удаление чатов** — удаление чата из списка си сохранением истории в `localStorage`

## Технологии

| Технология | Назначение |
| --- | --- |
| [React 19](https://react.dev/) | UI библиотека |
| [TypeScript](https://www.typescriptlang.org/) | Типизация |
| [Vite](https://vite.dev/) | Сборка и dev-сервер |
| [React Router 7](https://reactrouter.com/) | Маршрутизация |
| [styled-components](https://styled-components.com/) | Стилизация компонентов |

## Структура проекта

```
src/
├── api/                    # Работа с GREEN-API (checkAccount, sendMessage, receiveNotification, deleteNotification)
├── components/
│   ├── authForm/          # Форма входа (idInstance и tokenInstance)
│   ├── chatArea/          # Область чата (сообщения, отправка, получение）
│   └── sidebar/           # Боковая панель (список чатов, создание нового）
├── pages/
│   ├── Auth/              # Страница авторизации
│   └── Chat/              # Страница чата
├── shared/
│   ├── components/        # UI-компоненты（ Input, icons）
│   ├── hooks/             # useLocalStorage и ключи localStorage
│   ├── types/             # Типы Green API и сущностей приложения
│   └── constans.ts        # Базовый URL Green API
└── main.tsx                # Точка входа (маршруты⌘
```

## Предварительные требования

- **Node.js 20+** и **npm** (или другой пакетный менеджер： yarn, pnpm）
- Аккаунт в [GREEN-API](https://green-api.com/)（дашборд: https://console.green-api.com/）

### Как получить `idInstance` и `tokenInstance`

1. Зарегистрируйтесь на [console.green-api.com](https://console.green-api.com/)
2. Создайте новый инстанс (кнопка "Создать инстанс")
3. Скопируйте **ID инстанса** (`idInstance`) и **API-токен** (`tokenInstance`) из карточки инстанса
4. Вставьте их в форму входа приложения

> ⚠️ Данные инстанса хранятся локально в браузере (`localStorage`) и никуда не отправляются, кроме запросов к GREEN-API.

## Запуск проекта

```bash
# 1. Установите зависимости
npm install

# 2. Запустите dev-сервер
npm run dev
```

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173).

## Сборка и проверки

```bash
# Проверка типов и продакшн-сборка (результат в dist/)
npm run build

# Предпросмотр продакшн-сборки локально
npm run preview

# Линтинг кода
npm run lint
```

## Скрипты

| Команда | Описание |
| --- | --- |
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Проверка TypeScript + сборка в `dist/` |
| `npm run lint` | Проверка кода ESLint |
| `npm run preview` | Локальный предпросмотр собранного приложения |
