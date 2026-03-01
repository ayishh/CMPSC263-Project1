import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
  
// Register
export async function registerUser(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

// Login
export async function loginUser(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

// Check if email exists
export async function isEmailInUse(email) {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0;
}
