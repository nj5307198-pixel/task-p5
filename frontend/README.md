# DEV@Deakin Frontend (React + Vite + Tailwind)

Pages: `/` home (with the newsletter form), `/login`, `/signup`, `/post`.
Navbar and Footer are rendered once in `App.jsx`.

## Setup
```
npm install
cp .env.example .env     # Firebase web-app config + VITE_API_URL
npm run dev
```

The newsletter form (`src/components/SignupForm.jsx`) calls `POST {VITE_API_URL}/subscribe`
on the Express backend (see `../backend`), so start the backend first.

## Login / Signup (Task P4)
- **Sign up**: validates name, email, password strength and confirmation, bcrypt-hashes the
  password, and saves the user to Firestore `users/{email}`.
- **Login**: fetches `users/{email}` and runs `bcrypt.compare`.

Security note: this approach needs user documents (including hashes) to be readable by the
client. That is acceptable for a learning task, not for production. Real apps should use
Firebase Authentication or a server.

`.env` and `node_modules/` are in `.gitignore`. Never commit them.
