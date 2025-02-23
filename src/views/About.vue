<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold text-center mb-12">{{ localeStore.t('about.title') }}</h1>

      <!-- Company Introduction -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <p class="text-lg text-gray-600 mb-6">
          {{ localeStore.t('about.introduction') }}
        </p>
        <div class="grid grid-cols-3 gap-8 mt-12">
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">100k+</div>
            <div class="text-gray-600">{{ localeStore.t('about.stats.customers') }}</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div class="text-gray-600">{{ localeStore.t('about.stats.countries') }}</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div class="text-gray-600">{{ localeStore.t('about.stats.support') }}</div>
          </div>
        </div>
      </div>

      <!-- Our Mission -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-16">
        <h2 class="text-2xl font-bold mb-6 text-center">{{ localeStore.t('about.mission.title') }}</h2>
        <p class="text-gray-600 text-center max-w-3xl mx-auto">
          {{ localeStore.t('about.mission.content') }}
        </p>
      </div>

      <!-- Team Section -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-8 text-center">{{ localeStore.t('about.team.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <img src="/avatars/matthew.svg" alt="John Smith" class="w-24 h-24 rounded-full mx-auto mb-4">
            <h3 class="font-semibold text-lg mb-1">John Smith</h3>
            <p class="text-gray-600 mb-2">{{ localeStore.t('about.team.members.ceo.position') }}</p>
            <p class="text-sm text-gray-500">{{ localeStore.t('about.team.members.ceo.description') }}</p>
          </div>
          <div class="text-center">
            <img src="/avatars/ivy.svg" alt="Sarah Johnson" class="w-24 h-24 rounded-full mx-auto mb-4">
            <h3 class="font-semibold text-lg mb-1">Sarah Johnson</h3>
            <p class="text-gray-600 mb-2">{{ localeStore.t('about.team.members.operations.position') }}</p>
            <p class="text-sm text-gray-500">{{ localeStore.t('about.team.members.operations.description') }}</p>
          </div>
          <div class="text-center">
            <img src="/avatars/faith.svg" alt="Mike Wilson" class="w-24 h-24 rounded-full mx-auto mb-4">
            <h3 class="font-semibold text-lg mb-1">Mike Wilson</h3>
            <p class="text-gray-600 mb-2">{{ localeStore.t('about.team.members.tech.position') }}</p>
            <p class="text-sm text-gray-500">{{ localeStore.t('about.team.members.tech.description') }}</p>
          </div>
        </div>
      </div>

      <!-- Values -->
      <div>
        <h2 class="text-2xl font-bold mb-8 text-center">{{ localeStore.t('about.values.title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2">{{ localeStore.t('about.values.transparency.title') }}</h3>
            <p class="text-sm text-gray-600">{{ localeStore.t('about.values.transparency.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2">{{ localeStore.t('about.values.quality.title') }}</h3>
            <p class="text-sm text-gray-600">{{ localeStore.t('about.values.quality.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2">{{ localeStore.t('about.values.innovation.title') }}</h3>
            <p class="text-sm text-gray-600">{{ localeStore.t('about.values.innovation.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2">{{ localeStore.t('about.values.customerFocus.title') }}</h3>
            <p class="text-sm text-gray-600">{{ localeStore.t('about.values.customerFocus.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
</script> 