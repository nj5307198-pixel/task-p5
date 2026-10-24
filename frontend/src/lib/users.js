import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";

const SALT_ROUNDS = 10;
const normaliseEmail = (email) => email.trim().toLowerCase();

/** Create a user document. The password is stored only as a bcrypt hash. */
export async function registerUser({ name, email, password }) {
  const id = normaliseEmail(email);
  const ref = doc(db, "users", id); // email as document id => no duplicate accounts
  if ((await getDoc(ref)).exists()) {
    throw new Error("EMAIL_EXISTS");
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  await setDoc(ref, {
    name: name.trim(),
    email: id,
    passwordHash,
    createdAt: serverTimestamp(),
  });
}

/** Check email + password against Firestore. Returns { name, email } on success. */
export async function loginUser(email, password) {
  const snap = await getDoc(doc(db, "users", normaliseEmail(email)));
  if (!snap.exists()) throw new Error("INVALID_CREDENTIALS");
  const user = snap.data();
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("INVALID_CREDENTIALS");
  return { name: user.name, email: user.email };
}
