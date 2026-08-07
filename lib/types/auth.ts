export type AuthUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegistrationCredentials = LoginCredentials;
