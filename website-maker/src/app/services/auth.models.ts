export interface User {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  username: string;
  createdAt: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}
