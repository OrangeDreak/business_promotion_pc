<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold text-center mb-12">{{ localeStore.t('tools.title') }}</h1>
      
      <!-- Tool Categories -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full"
          :class="selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
        >
          {{ localeStore.t(`tools.categories.${category.toLowerCase()}`) }}
        </button>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="tool in filteredTools"
          :key="tool.id"
          class="card hover:shadow-xl transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <img :src="tool.icon" :alt="tool.name" class="w-6 h-6" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold">{{ localeStore.t(`tools.items.${tool.key}.name`) }}</h3>
                <p class="text-sm text-gray-600">{{ tool.category }}</p>
              </div>
            </div>
            <p class="text-gray-600 mb-6">{{ localeStore.t(`tools.items.${tool.key}.description`) }}</p>
            <a
              :href="tool.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary block text-center"
            >
              {{ localeStore.t('tools.useTool') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Tool } from '../types'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const selectedCategory = ref('All')

const categories = ['All', 'YouTube', 'Instagram', 'TikTok', 'Twitter', 'Other']

const tools = ref<(Tool & { key: string })[]>([
  {
    id: '1',
    key: 'youtubeDownloader',
    name: 'YouTube Video Downloader',
    description: 'Download YouTube videos in various formats and quality levels',
    category: 'YouTube',
    url: '/tools/youtube-downloader',
    icon: '/icons/youtube.svg'
  },
  {
    id: '2',
    key: 'instagramChecker',
    name: 'Instagram Username Checker',
    description: 'Check if an Instagram username is available',
    category: 'Instagram',
    url: '/tools/instagram-username-checker',
    icon: '/icons/instagram.svg'
  },
  {
    id: '3',
    key: 'tiktokDownloader',
    name: 'TikTok Video Downloader',
    description: 'Download TikTok videos without watermark',
    category: 'TikTok',
    url: '/tools/tiktok-downloader',
    icon: '/icons/tiktok.svg'
  }
])

const filteredTools = computed(() => {
  if (selectedCategory.value === 'All') {
    return tools.value
  }
  return tools.value.filter(tool => tool.category === selectedCategory.value)
})
</script> 