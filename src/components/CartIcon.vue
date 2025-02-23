<template>
  <div class="relative">
    <button 
      class="p-2 text-gray-600 hover:text-blue-600 transition-colors"
      @click="$emit('click')"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span v-if="itemsCount > 0" class="absolute -top-1 -right-1 blue-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ itemsCount }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const itemsCount = computed(() => cartStore.cartItemsCount)
</script>

<script lang="ts">
export default {
  name: 'CartIcon'
}
</script> 