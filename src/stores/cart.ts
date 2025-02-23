import { defineStore } from 'pinia'
import type { Service } from '@/types'

export interface CartItem {
  id: string
  service: Service
  amount: number
  skuId: number
  productId: number
  type: string
  price: number
  attributesEn?: string
  attributes?: string
}

interface CartState {
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),

  getters: {
    totalItems: (state) => state.items.length,
    totalAmount: (state) => state.items.reduce((total, item) => total + item.price, 0),
    cartItemsCount: (state) => state.items.reduce((total, item) => total + item.price, 0)
  },

  actions: {
    addItem(item: Omit<CartItem, 'id'>) {
      const id = `${item.service.id}-${item.price}-${item.type}-${Date.now()}`
      this.items.push({ ...item, id })
    },

    removeItem(id: string) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    clearCart() {
      this.items = []
    }
  }
}) 