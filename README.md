# Multiplayer Quiz Frontend

A React + Vite frontend for a multiplayer quiz application. Users can sign in, manage quizzes, host or join rooms, and play live quiz sessions over WebSockets.

Hosted frontend: https://multiplayer-quiz-frontend.onrender.com/ <br />
Hosted backend: https://multiplayer-quiz-backend.onrender.com/

## Overview

This project is the browser client for the [Multiplayer Quiz Backend](https://github.com/Sheikh-Rashdan/multiplayer-quiz-backend), a FastAPI service that provides authentication, quiz and question management, and real-time room gameplay.

The frontend uses the backend's REST API for user, quiz, question, and room data, and connects to its WebSocket endpoint for live room updates and gameplay.

## Features

- User signup and login with JWT authentication
- Browse and manage quizzes
- Create and manage quiz questions
- Create a room from a quiz and join using a room code
- Live room updates and quiz gameplay over WebSockets
- Host-driven quiz progression and answer feedback
- Responsive single-page experience for hosts and players

## Tech Stack

- React 19
- Vite
- React Router
- Axios for API requests
- Motion for UI animations
- Boxicons for icons

## Project Structure

```text
.
├── src/
│   ├── assets/           # Images and audio
│   ├── components/       # Screens and UI components
│   ├── scripts/
│   │   ├── api/          # Backend API clients
│   │   └── utils/        # Shared utilities
│   ├── App.jsx
│   └── main.jsx
├── .env.development      # Local backend URL
├── .env.production       # Hosted backend URL
├── index.html
├── package.json
└── vite.config.js
```

## Prerequisites

- Node.js and npm
- The [Multiplayer Quiz Backend](https://github.com/Sheikh-Rashdan/multiplayer-quiz-backend), either running locally or available at its hosted URL

## Quick Start

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Sheikh-Rashdan/multiplayer-quiz-frontend.git
   cd multiplayer-quiz-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the backend URL in `.env.development`:

   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

   For local development, start the backend before launching the frontend. The checked-in `.env.production` points to the hosted backend:

   ```env
   VITE_API_URL=https://multiplayer-quiz-backend.onrender.com
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal, typically http://localhost:5173.

## Backend Integration

`VITE_API_URL` is the base URL for both REST and WebSocket connections. The frontend uses these backend routes:

### Authentication

- `POST /users/signup` — create an account
- `POST /users/login` — log in and receive an authentication token
- `GET /users/me` — fetch the signed-in user's profile
- `GET /users/{user_id}` — fetch a user by ID

### Quizzes and Questions

- `GET /quizzes/me` — list the signed-in user's quizzes
- `GET /quizzes/{quiz_id}` — fetch a quiz
- `POST /quizzes` — create a quiz
- `DELETE /quizzes/{quiz_id}` — delete a quiz
- `GET /quizzes/{quiz_id}/questions` — list quiz questions
- `GET /quizzes/{quiz_id}/questions/{question_id}` — fetch a question
- `POST /quizzes/{quiz_id}/questions` — create a question
- `DELETE /quizzes/{quiz_id}/questions/{question_id}` — delete a question

### Rooms

- `POST /rooms` — create a room for a quiz
- `GET /rooms/{room_id}` — fetch room details
- `WS /rooms/{room_id}` — connect to a live room; the frontend authenticates using the token query parameter

The backend's interactive API documentation is available at `/docs` (for example, https://multiplayer-quiz-backend.onrender.com/docs).
