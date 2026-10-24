import { useState } from "react";

// Frontend -> ExpressJS backend, using fetch() as allowed by the task sheet
const BACKEND_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/subscribe`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error" | "sending" | ""

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation before sending anything (server validates again with Zod)
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setMessage("Sending...");

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Subscribed! Check your inbox.");
        setStatus("success");
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setMessage("Could not reach the server. Is it running?");
      setStatus("error");
    }
  };

  const messageColor =
    status === "success"
      ? "text-green-600"
      : status === "error"
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div id="signup" className="mt-8 mb-10 text-center">
      <p className="text-2xl mb-4 text-teal-600">Sign Up For Our Daily Insider</p>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex justify-center gap-2 flex-wrap"
      >
        <input
          type="email"
          id="email-input"
          name="email"
          placeholder="Enter your email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-teal-300 rounded px-3 py-2 w-64"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <p
          role={status === "error" ? "alert" : "status"}
          className={`mt-3 text-sm font-medium ${messageColor}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
