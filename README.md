# oceanxwork

## Run

1. Install dependencies:

   npm install

2. Create a local environment file:

   Copy `.env.example` to `.env` and set your SMTP credentials.

3. Start frontend and backend:

   npm run dev

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
