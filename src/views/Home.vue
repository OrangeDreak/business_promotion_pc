<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden">
      <div class="container-custom py-24 sm:py-32">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8">
            {{ localeStore.t('home.hero.title') }}
            <span class="inline-flex items-center">
              <span class="mr-2">👍</span>
              <span class="gradient-text">BusinessPromo</span>
            </span>
            <br />
            {{ localeStore.t('home.hero.subtitle') }}
            <span class="inline-flex items-center">
              <span class="text-blue-600">{{ localeStore.t('home.hero.exponentially') }}</span>
              <span class="ml-2">📈</span>
            </span>
          </h1>
          <p class="mt-6 text-xl leading-8 text-gray-600">
            {{ localeStore.t('home.hero.description') }}
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/services" class="btn-primary text-lg">
              {{ localeStore.t('home.hero.viewServices') }}
            </a>
            <a href="#how-it-works" class="btn-secondary text-lg">
              {{ localeStore.t('home.hero.learnMore') }}
            </a>
          </div>
        </div>

        <!-- Live Updates -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3 animate-float">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span class="text-green-600">✓</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">12,751 followers delivered</p>
              <p class="text-xs text-gray-400">8 mins ago</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3 animate-float" style="animation-delay: 0.2s">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600">♥</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">1,580 likes delivered</p>
              <p class="text-xs text-gray-400">28 mins ago</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3 animate-float" style="animation-delay: 0.4s">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-purple-600">★</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">6,576 subscribers delivered</p>
              <p class="text-xs text-gray-400">43 mins ago</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3 animate-float" style="animation-delay: 0.6s">
            <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <span class="text-yellow-600">👁</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">16,359 views delivered</p>
              <p class="text-xs text-gray-400">8 mins ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
          <div class="p-6">
            <div class="text-5xl font-bold mb-2">100k+</div>
            <div class="text-lg">{{ localeStore.t('home.stats.customers') }}</div>
          </div>
          <div class="p-6">
            <div class="text-5xl font-bold mb-2">1.7B+</div>
            <div class="text-lg">{{ localeStore.t('home.stats.reached') }}</div>
          </div>
          <div class="p-6">
            <div class="text-5xl font-bold mb-2">4.8</div>
            <div class="text-lg">{{ localeStore.t('home.stats.rating') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Platforms -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="section-title">{{ localeStore.t('home.services.title') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <a href="/services/instagram" class="group">
            <div class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <img src="/icons/instagram.svg" alt="Instagram" class="w-12 h-12 mx-auto mb-4" />
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600">Instagram</h3>
              <p class="text-sm text-gray-600 mt-2">Followers, Likes & Views</p>
            </div>
          </a>
          <a href="/services/tiktok" class="group">
            <div class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <img src="/icons/tiktok.svg" alt="TikTok" class="w-12 h-12 mx-auto mb-4" />
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600">TikTok</h3>
              <p class="text-sm text-gray-600 mt-2">Followers, Likes & Views</p>
            </div>
          </a>
          <a href="/services/youtube" class="group">
            <div class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <img src="/icons/youtube.svg" alt="YouTube" class="w-12 h-12 mx-auto mb-4" />
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600">YouTube</h3>
              <p class="text-sm text-gray-600 mt-2">Subscribers & Views</p>
            </div>
          </a>
          <a href="/services" class="group">
            <div class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <div class="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">+</span>
              </div>
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600">{{ localeStore.t('home.services.viewAll') }}</h3>
              <p class="text-sm text-gray-600 mt-2">View All Services</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-24 bg-white">
      <div class="container-custom">
        <h2 class="section-title">{{ localeStore.t('home.howItWorks.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ localeStore.t('home.howItWorks.step1.title') }}</h3>
            <p class="text-gray-600">{{ localeStore.t('home.howItWorks.step1.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ localeStore.t('home.howItWorks.step2.title') }}</h3>
            <p class="text-gray-600">{{ localeStore.t('home.howItWorks.step2.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ localeStore.t('home.howItWorks.step3.title') }}</h3>
            <p class="text-gray-600">{{ localeStore.t('home.howItWorks.step3.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-24 bg-gray-50">
      <div class="container-custom">
        <h2 class="section-title">What Our Customers Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="review in reviews" :key="review.id" class="bg-white rounded-lg shadow-sm p-8">
            <div class="flex items-center mb-6">
              <img :src="review.avatar" :alt="review.name" class="w-12 h-12 rounded-full" />
              <div class="ml-4">
                <div class="font-semibold text-lg">{{ review.name }}</div>
                <div class="text-gray-500 text-sm">{{ review.date }}</div>
              </div>
            </div>
            <p class="text-gray-600 mb-6">{{ review.content }}</p>
            <div class="flex">
              <div v-for="i in 5" :key="i" class="text-yellow-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()

const reviews = ref([
  {
    id: 1,
    name: 'Matthew E.',
    avatar: '/avatars/matthew.svg',
    content: 'Purchased Twitter followers for my crypto project, and it helped us gain credibility. A great service',
    rating: 5,
    date: '12/06/2024'
  },
  {
    id: 2,
    name: 'Ivy L.',
    avatar: '/avatars/ivy.svg',
    content: 'I\'ve had a fantastic experience with SP! My Instagram followers increased in no time, and my online store has been thriving.',
    rating: 5,
    date: '20/03/2023'
  },
  {
    id: 3,
    name: 'Faith W.',
    avatar: '/avatars/faith.svg',
    content: 'Super impressed with how this worked! I finally hit 1k subs, and now YouTube\'s pushing my content way more.',
    rating: 5,
    date: '12/09/2024'
  }
])
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style> 