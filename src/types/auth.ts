export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  code: number
  message: string
  data: {
    token?: string
    user?: {
      id: number
      email: string
      firstName: string
      lastName: string
    }
  }
}

export interface AuthError {
  message: string
  field?: string
}

export interface AuthState {
  user: null | {
    id: number
    email: string
    firstName: string
    lastName: string
  }
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
} 