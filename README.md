# oceanxwork

## Run

1. Install dependencies:

   npm install

2. Create a local environment file:

   Copy `.env.example` to `.env` and set your SMTP credentials.

3. Start frontend and backend:

   npm run dev

## Docker Run

1. Make sure Docker Desktop is running.

2. Create your local environment file:

   Copy .env.example to .env and set your mail credentials.

3. Start both frontend and backend with one command:

   docker compose up --build

4. Open the app:

   - Frontend: http://localhost:5173
   - Backend health: http://localhost:3001/api/health

5. Stop containers:

   docker compose down

## Environment Variable Guide

- Server side only:
  - SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS
  - or EMAIL_HOST / EMAIL_PORT / EMAIL_USER / EMAIL_PASSWORD
  - ADMIN_EMAIL
  - EMAIL_FROM
  - PORT

- Client side (only if needed in future):
  - Vite only exposes variables prefixed with VITE_.
  - Do not put SMTP or email passwords in client-side variables.

In this project today, your contact email credentials belong on the server side only (in .env used by the server container).

## Contact Form Email Wiring

The Contact page at `http://localhost:5173/contact` submits to backend tRPC endpoint `contact.submit`.

- Frontend call: `client/src/pages/Contact.tsx`
- Backend router: `server/routers/contact.ts`
- Email sender service: `server/services/contactMailer.ts`

Emails are sent to:

- `hello@oceanex.group`

Required SMTP env vars:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Optional env var:

- `EMAIL_FROM`
For local development, you can use a sandbox SMTP provider such as Mailtrap.
