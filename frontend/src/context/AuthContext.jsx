import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "devdeakin_user";

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const signIn = (u) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  };
  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
