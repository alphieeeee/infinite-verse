import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Unsubscribe,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";
import type { AuthUser, LoginCredentials } from "../types/auth";
import type { RegistrationCredentials } from "../types/auth";

function getAuthErrorMessage(error: unknown, action: string) {
  if (error instanceof Error && error.message) {
    return `Unable to ${action}: ${error.message}`;
  }

  return `Unable to ${action}. Please try again.`;
}

function validateCredentials({ email, password }: LoginCredentials) {
  if (!email.trim()) {
    throw new Error("Email is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }
}

function mapAuthUser(user: User): AuthUser {
  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  validateCredentials(credentials);

  try {
    const result = await signInWithEmailAndPassword(auth, credentials.email.trim(), credentials.password);
    return mapAuthUser(result.user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, "log in"));
  }
}

export async function submitLogin(credentials: LoginCredentials): Promise<AuthUser> {
  return login(credentials);
}

export async function register(credentials: RegistrationCredentials): Promise<AuthUser> {
  validateCredentials(credentials);

  try {
    const result = await createUserWithEmailAndPassword(auth, credentials.email.trim(), credentials.password);
    return mapAuthUser(result.user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, "create your account"));
  }
}

export async function submitRegistration(credentials: RegistrationCredentials): Promise<AuthUser> {
  return register(credentials);
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, "log out"));
  }
}

export function subscribeToAuthState(callback: (user: AuthUser | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? mapAuthUser(user) : null);
  });
}
