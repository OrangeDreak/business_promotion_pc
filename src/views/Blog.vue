<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold text-center mb-12">Blog</h1>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Categories -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-lg font-semibold mb-4">Categories</h2>
            <div class="space-y-2">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                class="block w-full text-left px-4 py-2 rounded-lg"
                :class="selectedCategory === category ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Popular Posts -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold mb-4">Popular Posts</h2>
            <div class="space-y-4">
              <a
                v-for="post in popularPosts"
                :key="post.id"
                :href="post.url"
                class="block group"
              >
                <h3 class="text-gray-900 group-hover:text-blue-600 font-medium">
                  {{ post.title }}
                </h3>
                <p class="text-sm text-gray-500">{{ post.date }}</p>
              </a>
            </div>
          </div>
        </div>

        <!-- Blog Posts -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article
              v-for="post in filteredPosts"
              :key="post.id"
              class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-2">
                  <span>{{ post.date }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ post.category }}</span>
                </div>
                <h2 class="text-xl font-semibold mb-2">
                  <a :href="post.url" class="text-gray-900 hover:text-blue-600">
                    {{ post.title }}
                  </a>
                </h2>
                <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
                <div class="flex items-center">
                  <img
                    :src="post.author.avatar"
                    :alt="post.author.name"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{{ post.author.name }}</p>
                    <p class="text-sm text-gray-500">{{ post.author.role }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Pagination -->
          <div class="mt-12 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                class="px-3 py-2 rounded-lg bg-white text-gray-500 hover:text-blue-600 disabled:opacity-50"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Previous
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                class="px-3 py-2 rounded-lg"
                :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:text-blue-600'"
              >
                {{ page }}
              </button>
              <button
                class="px-3 py-2 rounded-lg bg-white text-gray-500 hover:text-blue-600 disabled:opacity-50"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentPage = ref(1)
const totalPages = 5
const selectedCategory = ref('All')

const categories = [
  'All',
  'Social Media Marketing',
  'Growth Strategies',
  'Case Studies',
  'Platform Updates',
  'Tips & Tricks'
]

const popularPosts = [
  {
    id: 1,
    title: '10 Ways to Grow Your Instagram Following',
    date: 'March 15, 2024',
    url: '/blog/grow-instagram-following'
  },
  {
    id: 2,
    title: 'TikTok Marketing Guide for 2024',
    date: 'March 10, 2024',
    url: '/blog/tiktok-marketing-guide'
  },
  {
    id: 3,
    title: 'YouTube Algorithm: Latest Changes',
    date: 'March 5, 2024',
    url: '/blog/youtube-algorithm'
  }
]

const posts = ref([
  {
    id: 1,
    title: 'How to Create Viral TikTok Content',
    excerpt: 'Learn the secrets behind creating content that goes viral on TikTok...',
    date: 'March 20, 2024',
    category: 'Growth Strategies',
    image: '/images/blog/tiktok-viral.jpg',
    url: '/blog/viral-tiktok-content',
    author: {
      name: 'John Smith',
      role: 'Content Strategist',
      avatar: '/avatars/matthew.svg'
    }
  },
  {
    id: 2,
    title: 'Instagram Reels vs TikTok: Which is Better?',
    excerpt: 'A comprehensive comparison of Instagram Reels and TikTok for creators...',
    date: 'March 18, 2024',
    category: 'Platform Updates',
    image: '/images/blog/reels-vs-tiktok.jpg',
    url: '/blog/reels-vs-tiktok',
    author: {
      name: 'Sarah Johnson',
      role: 'Social Media Expert',
      avatar: '/avatars/ivy.svg'
    }
  },
  {
    id: 3,
    title: 'Maximizing YouTube Engagement',
    excerpt: 'Discover proven strategies to increase engagement on your YouTube videos...',
    date: 'March 15, 2024',
    category: 'Tips & Tricks',
    image: '/images/blog/youtube-engagement.jpg',
    url: '/blog/youtube-engagement',
    author: {
      name: 'Mike Wilson',
      role: 'Video Marketing Specialist',
      avatar: '/avatars/faith.svg'
    }
  }
])

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All') {
    return posts.value
  }
  return posts.value.filter(post => post.category === selectedCategory.value)
})
</script> 