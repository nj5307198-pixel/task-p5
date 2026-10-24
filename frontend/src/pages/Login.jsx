import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../lib/users.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const justRegistered = location.state?.registered;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      signIn(user);
      navigate("/"); // correct details -> home page
    } catch (err) {
      setError(
        err.message === "INVALID_CREDENTIALS"
          ? "incorrect"
          : "Something went wrong connecting to the database. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-ui mx-auto my-12 w-full max-w-md px-4">
      <div className="border border-brand-500 p-6">
        <div className="flex justify-end">
          <Link
            to="/signup"
            className="border border-brand-500 px-3 py-1 text-sm text-brand-600 hover:bg-brand-50"
          >
            Sign up
          </Link>
        </div>

        {justRegistered && (
          <p role="status" className="mt-3 bg-brand-50 p-2 text-sm text-brand-700">
            Account created. Log in to continue.
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4 px-2">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm">
              Your email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm">
              Your password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error === "incorrect" ? (
                <>
                  Incorrect email or password. Please try again, or{" "}
                  <Link to="/signup" className="underline">
                    sign up for a free account
                  </Link>
                  .
                </>
              ) : (
                error
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
