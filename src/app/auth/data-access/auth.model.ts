export interface User {
  username: string;
  // resto de información de usuario
  // email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// export type SignupFormModel = Pick<User, 'username' | 'email'>;