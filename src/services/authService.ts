import axios from 'axios'
import type { RegisterCredentials, LoginCredentials, AuthResponse } from '@/types/auth'

// const API_BASE_URL = 'https://business-promo.com/bp' // online
const API_BASE_URL = 'https://business-promo.com/bp' // local

const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { name, email, password } = credentials
    const [firstName, lastName] = name.split(' ')
    
    const response = await axios.post(`${API_BASE_URL}/app/user/register`, {
      firstName: firstName || name,
      lastName: lastName || '',
      email,
      password
    })
    
    return response.data
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/app/user/login`, {
      loginName: credentials.email,
      password: credentials.password
    })
    
    return response.data
  }
}

export default authService 