# App Repository — Web

Web UI for a self-hosted **iOS and Android build distribution** service: browse
projects, find the latest build of each branch and install it on your phone by
scanning a QR code.

The API, including the iOS over-the-air install flow, lives in
[app_repository_server](https://github.com/vineborba/app_repository_server)
(Rust + Axum + MongoDB).

## Stack

- **SolidJS** with TypeScript and **Vite**
- **@solidjs/router** with lazy-loaded pages
- **Tailwind CSS** and **solid-headless** for accessible dialogs and transitions
- **redaxios** as a lightweight HTTP client, **date-fns**, **solid-icons**

## Features

- Sign-up and login (JWT stored client-side and sent as a bearer token)
- Project list with favourites, plus create and edit, including a project
  image (project deletion is in the UI, but the API endpoint was never added)
- Project page with builds grouped by branch and a platform filter (iOS/Android)
- For each build: a QR code to install on the device, and direct download in the
  browser

## Project structure

```
src/
  pages/        Home (projects), Project (builds), SignUp
  components/   project and artifact cards, modals (create/edit/delete, QR code), form controls
  api/          typed calls per resource on top of a shared client
  contexts/     current user
  schemas/      domain types
```

## Running locally

Requires Node.js, pnpm and a running
[app_repository_server](https://github.com/vineborba/app_repository_server).

```sh
pnpm install
echo "VITE_API_URL=https://localhost:3002" > .env
pnpm dev
```

Build with `pnpm build`.
