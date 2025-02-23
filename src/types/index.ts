export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Service {
  id: number
  title: string
  description: string
  price: number
  productId: number
  features: string[]
  category: string
  icon?: string
  status: number
  platform: number
  serviceTag: string
  serviceTagEn: string
}

export interface Order {
  id: string
  userId: string
  serviceId: number
  quantity: number
  totalPrice: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  url: string
  icon?: string
} 