import nodemailer from "nodemailer";

type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  enquiryType: string;
  budget?: string | null;
  message?: string | null;
  pageUrl?: string;
  submittedAt: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? process.env.EMAIL_HOST;
  const port = Number(process.env.SMTP_PORT ?? process.env.EMAIL_PORT ?? 587);
  const user = process.env.SMTP_USER ?? process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS ?? process.env.EMAIL_PASSWORD;
  const secureRaw = process.env.SMTP_SECURE;
  const secure = typeof secureRaw === "string" ? secureRaw === "true" : port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure,
    auth: { user, pass },
  };
}

function buildHtml(payload: ContactEmailPayload) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone || "-"}</p>
    <p><strong>Company:</strong> ${payload.company || "-"}</p>
    <p><strong>Enquiry Type:</strong> ${payload.enquiryType}</p>
    <p><strong>Budget:</strong> ${payload.budget || "-"}</p>
    <p><strong>Submitted At:</strong> ${payload.submittedAt}</p>
    <p><strong>Page URL:</strong> ${payload.pageUrl || "-"}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${payload.message || "-"}</pre>
  `;
}

function buildText(payload: ContactEmailPayload) {
  return [
    "New Contact Form Submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    `Company: ${payload.company || "-"}`,
    `Enquiry Type: ${payload.enquiryType}`,
    `Budget: ${payload.budget || "-"}`,
    `Submitted At: ${payload.submittedAt}`,
    `Page URL: ${payload.pageUrl || "-"}`,
    "",
    "Message:",
    payload.message || "-",
  ].join("\n");
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("SMTP is not configured. Please set SMTP_* or EMAIL_* env variables.");
  }

  const contactTo = process.env.ADMIN_EMAIL || "hello@oceanex.group";
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || "no-reply@oceanex.group";
  const transporter = nodemailer.createTransport(smtp);

  const subject = `[Oceanex Contact] ${payload.enquiryType} - ${payload.name}`;

  const info = await transporter.sendMail({
    from,
    to: contactTo,
    replyTo: payload.email,
    subject,
    text: buildText(payload),
    html: buildHtml(payload),
  });

  return { messageId: info.messageId };
}
