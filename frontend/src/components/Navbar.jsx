import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="font-ui border-b border-slate-200 bg-slate-50">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2">
        <Link to="/" className="text-lg font-bold text-slate-900">
          DEV@Deakin
        </Link>

        <label className="relative flex-1">
          <span className="sr-only">Search</span>
          <Search
            size={14}
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-sm border border-slate-200 bg-white py-1.5 pl-7 pr-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </label>

        <div className="flex items-center gap-4 text-sm text-slate-800">
          <Link to="/post" className="hover:text-brand-600">
            Post
          </Link>
          {user ? (
            <button type="button" onClick={signOut} className="hover:text-brand-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-brand-600">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}