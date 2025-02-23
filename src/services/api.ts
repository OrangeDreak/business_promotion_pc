import axios from 'axios'
import type { Service, Tool, Order } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getServices = () => api.get<Service[]>('/services')
export const getService = (id: number) => api.get<Service>(`/services/${id}`)
export const getTools = () => api.get<Tool[]>('/tools')
export const getTool = (id: string) => api.get<Tool>(`/tools/${id}`)
export const createOrder = (data: Partial<Order>) => api.post<Order>('/orders', data)
export const getOrders = () => api.get<Order[]>('/orders')

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api 