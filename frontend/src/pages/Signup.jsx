import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../lib/users.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, password, confirm }) {
  const errors = {};
  if (name.trim().split(/\s+/).filter(Boolean).length < 2)
    errors.name = "Enter your first and last name.";
  if (!EMAIL_RE.test(email.trim())) errors.email = "Enter a valid email address.";
  if (password.length < 8) errors.password = "Use at least 8 characters.";
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password))
    errors.password = "Include at least one letter and one number.";
  if (confirm !== password) errors.confirm = "Passwords do not match.";
  return errors;
}

function Field({ id, label, error, ...props }) {
  return (
    <div className="grid items-start gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <label htmlFor={id} className="pt-1.5 text-sm">
        {label}*
      </label>
      <div>
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      await registerUser(form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      if (err.message === "EMAIL_EXISTS") {
        setErrors({ email: "An account with this email already exists." });
      } else {
        setFormError("Could not create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-ui mx-auto my-12 w-full max-w-2xl px-4">
      <div className="border border-brand-500 p-6">
        <h1 className="mb-6 text-center text-base text-brand-600">
          Create a DEV@Deakin Account
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Field id="name" label="Name" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} />
          <Field id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
          <Field id="password" label="Password" type="password" autoComplete="new-password" value={form.password} onChange={set("password")} error={errors.password} />
          <Field id="confirm" label="Confirm password" type="password" autoComplete="new-password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} />

          {formError && (
            <p role="alert" className="text-sm text-red-600">
              {formError}
            </p>
          )}

          <div className="sm:pl-[11rem]">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-600 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
