require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { z } = require("zod");

// Fail fast if the email API is not configured
if (!process.env.ELASTICEMAIL_API_KEY || !process.env.ELASTICEMAIL_FROM_EMAIL) {
  console.error("Missing ELASTICEMAIL_API_KEY or ELASTICEMAIL_FROM_EMAIL in .env");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow the React frontend (Vite dev server) to call this API
app.use(express.json());

// API keys live in .env which is in .gitignore
const ELASTIC_EMAIL_API_URL =
  "https://api.elasticemail.com/v4/emails/transactional";

const subscribers = [];

// Zod schema validating the data sent in the request body
const subscribeSchema = z.object({
  email: z
    .string({ required_error: "Email is required.", invalid_type_error: "Email must be text." })
    .trim()
    .toLowerCase()
    .min(1, "Email is required.")
    .max(254, "Email is too long.")
    .email("Please provide a valid email address."),
});

// Malformed JSON bodies -> 400 instead of a default HTML error page
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Request body must be valid JSON." });
  }
  return next(err);
});

// POST /subscribe - send a welcome email, then add the subscriber
app.post("/subscribe", async (req, res) => {
  const parsed = subscribeSchema.safeParse(req.body ?? {});

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const { email } = parsed.data;

  if (subscribers.includes(email)) {
    return res.status(200).json({ message: "You're already subscribed!" });
  }

  try {
    const response = await fetch(ELASTIC_EMAIL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ElasticEmail-ApiKey": process.env.ELASTICEMAIL_API_KEY,
      },
      body: JSON.stringify({
        Recipients: { To: [email] },
        Content: {
          From: process.env.ELASTICEMAIL_FROM_EMAIL,
          Subject: "Welcome to DEV@Deakin!",
          Body: [
            {
              ContentType: "HTML",
              Content:
                "<strong>Thanks for subscribing to the DEV@Deakin Daily Insider newsletter!</strong>",
            },
          ],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Elastic Email error:", response.status, data);
      // 502: our server is fine, the upstream email API failed
      return res
        .status(502)
        .json({ message: "We couldn't send the welcome email. Please try again." });
    }

    // Only remember the subscriber once the email has really been sent,
    // so a failed attempt can be retried.
    subscribers.push(email);

    // Screenshot this line for the report (successful Status 200 from the Email API)
    console.log(`Email sent to ${email} - Status: ${response.status}, MessageID: ${data.MessageID}`);

    return res.status(200).json({
      message: "Subscribed! A welcome email is on its way.",
      messageId: data.MessageID,
    });
  } catch (error) {
    console.error("Elastic Email request failed:", error.message);
    return res
      .status(502)
      .json({ message: "We couldn't send the welcome email. Please try again." });
  }
});

// GET /subscribers - simple helper route to verify the mailing list while testing
app.get("/subscribers", (req, res) => {
  res.status(200).json({ count: subscribers.length, subscribers });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
