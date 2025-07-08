# 🧠 Synote Backend

This is the backend server for **Synote**, a note and task management app. Built using **Node.js**, **Express**, **MongoDB**, and **JWT authentication**, it also integrates **AI summarization** using the Mistral 7B model via OpenRouter.

---

## 📁 Project Structure

```
server/
└── source/
    ├── controllers/    # Route logic
    ├── db/             # DB connection setup
    ├── middlewares/    # Auth & error middlewares
    ├── models/         # Mongoose models
    ├── routes/         # Express routes
    ├── services/       # Token / AI / utility services
    ├── utils/          # Misc helpers
    ├── app.js
    ├── constants.js
    └── server.js
```

---

## ✨ Features

- ✅ JWT-based authentication with secure cookies
- ✅ User registration, login, logout, refresh tokens
- ✅ Notes and Tasks CRUD APIs
- ✅ Subtasks system nested under tasks
- ✅ AI-powered note/task summarization using Mistral 7B
- ✅ Express middleware for route protection and error handling
- ✅ Clean modular code and service-oriented architecture

---

## 📌 API Endpoints

> All endpoints are prefixed with `/api/v1/`

### 👤 Auth (`/users`)

| Method | Route             | Description                |
| ------ | ----------------- | -------------------------- |
| POST   | `/register`       | Register new user          |
| POST   | `/login`          | Login user                 |
| GET    | `/me`             | Get current user           |
| PATCH  | `/me`             | Update user (avatar, etc.) |
| POST   | `/logout`         | Logout user                |
| POST   | `/refresh-tokens` | Refresh access token       |

---

### 📝 Notes

| Method | Route        | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/notes/`    | Create a new note |
| GET    | `/notes/`    | Fetch all notes   |
| GET    | `/notes/:id` | Get note by ID    |
| PATCH  | `/notes/:id` | Update note       |
| DELETE | `/notes/:id` | Delete note       |

---

### ✅ Tasks

| Method | Route                         | Description         |
| ------ | ----------------------------- | ------------------- |
| POST   | `/tasks/`                     | Create new task     |
| GET    | `/tasks/`                     | Fetch all tasks     |
| GET    | `/tasks/:id`                  | Get task by ID      |
| PATCH  | `/tasks/:id`                  | Update task         |
| DELETE | `/tasks/:id`                  | Delete task         |
| GET    | `/tasks/tasks-with-subtasks/` | Tasks with subtasks |

---

### ↻ Subtasks

| Method | Route                           | Description                |
| ------ | ------------------------------- | -------------------------- |
| POST   | `/tasks/:id/subtask`            | Add subtask to task        |
| GET    | `/tasks/:id/subtask`            | List all subtasks for task |
| PATCH  | `/tasks/:id/subtask/:subtaskId` | Update a specific subtask  |
| DELETE | `/tasks/:id/subtask/:subtaskId` | Delete a specific subtask  |

---

### 🧠 AI-Powered Summarization

| Method | Route                         | Description      |
| ------ | ----------------------------- | ---------------- |
| GET    | `/ai/notes/:noteId/summarize` | Summarize a note |
| GET    | `/ai/tasks/:id/summarize`     | Summarize a task |

---

## 🛠️ Setup & Running

### Install & Run Backend

```bash
cd server
npm install
npm run dev
```

---

### 🔐 ENV Configuration (`server/.env`)

```ini
PORT=8000
MONGODB_URI=your-mongo-db-uri
CORS_ORIGIN=your-cors-origin-url
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=7d
OPEN_ROUTER_API_KEY=your-openrouter-api-key
```

---

## ⚙️ Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT** (access & refresh tokens)
- **AI Summarization** via [OpenRouter API](https://openrouter.ai)
- **Middleware**: auth, error handling, validation
- **Tooling**: dotenv, nodemon, Postman, ESLint, Prettier

---

## 📝 License

MIT © 2025 [Aryan Singh Thakur](https://github.com/Aryan9inja)
