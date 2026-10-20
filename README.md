# Ohana Hotel System

A responsive, frontend-only hotel management demo built with React, Vite, and TypeScript. It includes login, registration, password-recovery, and a protected dashboard with illustrative hotel metrics and booking activity.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To explore the dashboard, sign in with any valid email address and a password of at least eight characters. New demo profiles can also be registered; profile names and emails are saved locally, and duplicate email addresses are rejected.

## Build

```sh
npm run build
npm run preview
```

The production build is written to `dist/`.

## Deployment

This is a static single-page application. For a root deployment, the default Vite base path `/` is appropriate. To deploy under a project subpath, set `VITE_BASE_PATH` to a value such as `/ohana-hotel-system/` before building (or add it to a local `.env` file). The app uses browser history routing; configure your static host to serve `index.html` as the fallback for client-side routes. Do not configure a static host as a SQLite database or authentication server.

## Demo authentication and privacy

Authentication is deliberately simulated for UI demonstration only:

- Any syntactically valid email and non-empty password can sign in. The password is never stored or sent anywhere.
- Registration stores only a profile name and email in browser `localStorage`, for duplicate-email checks. The active demo session stores only that profile in `sessionStorage`, or in `localStorage` when “Remember me” is selected.
- Password recovery displays an explicit notice. No recovery email or password reset is sent or performed.
- Browser storage can be read or modified by the browser user and is not a secure account database. The dashboard route guard is client-side only and does not provide real authorization.
- Dashboard numbers, arrivals, and booking activity are sample data, not live hotel operations.

Replace `src/services/authService.ts` with an integration to a trusted authentication provider and protected backend before using this project for real accounts or hotel data. Keep authorization and sensitive data enforcement on the server.

## Project structure

```text
src/
  auth/         Auth state provider
  components/   Shared brand, authentication layout, and form controls
  pages/        Login, registration, recovery, dashboard, and not-found pages
  services/     Demo authentication and browser storage boundary
  App.tsx       Client-side routes and dashboard guard
  index.css     Responsive application styling
```
