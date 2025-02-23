import { defineStore } from 'pinia'
import type { AuthState, RegisterCredentials, LoginCredentials } from '@/types/auth'
import authService from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null
      
      try {
        const response = await authService.login(credentials)
        
        if (response.code === 200 && response.data) {
          const { token, user } = response.data
          this.token = token || null
          this.user = user || null
          this.isAuthenticated = !!token
          
          // Store token in localStorage
          if (token) {
            localStorage.setItem('token', token)
          }
          
          // Redirect to dashboard
          router.push('/services')
        } else {
          this.error = response.message || 'Login failed'
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed'
        console.error('Login error:', error)
      } finally {
        this.loading = false
      }
    },

    async register(credentials: RegisterCredentials) {
      this.loading = true
      this.error = null
      
      try {
        const response = await authService.register(credentials)
        
        if (response.code === 200 && response.data) {
          const { token, user } = response.data
          this.token = token || null
          this.user = user || null
          this.isAuthenticated = !!token
          
          // Store token in localStorage
          if (token) {
            localStorage.setItem('token', token)
          }
          
          // Redirect to dashboard
          router.push('/services')
        } else {
          this.error = response.message || 'Registration failed'
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Registration failed'
        console.error('Registration error:', error)
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      router.push('/auth/login')
    }
  }
}) 