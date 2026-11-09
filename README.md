# Multiplayer Quiz Frontend

A React + Vite frontend for a multiplayer quiz game where users can sign up, create or join rooms, and take part in live quiz sessions.

## Features

- User authentication with login/signup
- Host quiz sessions and manage room lifecycle
- Join a room using a room code
- Real-time quiz gameplay over WebSockets
- Question progression, answer feedback, and room updates
- Responsive single-page experience for quiz players

## Tech Stack

- React 19
- Vite
- React Router
- Axios for API calls
- Motion for UI animations
- Boxicons for icons

## Project Structure

- `src/` — application source code
  - `components/` — screen components and UI elements
  - `scripts/api/` — API clients for users, quizzes, rooms, and questions
  - `assets/` — static images and branding
- `index.html` — app entry HTML
- `vite.config.js` — Vite configuration
- `.env.development` and `.env.production` — environment configuration

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```
2. Set the backend URL in your environment file:

   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal, typically:

   ```text
   http://localhost:5173
   ```

## Environment Notes

This frontend expects a backend API and WebSocket server to be available at the URL defined in `VITE_API_URL`. If you are running the backend locally, make sure it is started before using the app
