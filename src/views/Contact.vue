<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ localeStore.t('contact.title') }}
        </h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          {{ localeStore.t('contact.subtitle') }}
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          {{ localeStore.t('contact.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Email Section -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">{{ localeStore.t('contact.email.title') }}</h3>
          <p class="text-gray-600">{{ localeStore.t('contact.email.value') }}</p>
        </div>

        <!-- Chat Section -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">{{ localeStore.t('contact.chat.title') }}</h3>
          <p class="text-gray-600">{{ localeStore.t('contact.chat.value') }}</p>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h3 class="text-2xl font-semibold mb-6 text-center">
          {{ localeStore.t('contact.form.title') }}
        </h3>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              {{ localeStore.t('contact.form.name.label') }}
            </label>
            <input
              type="text"
              v-model="formData.name"
              :placeholder="localeStore.t('contact.form.name.placeholder')"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              {{ localeStore.t('contact.form.email.label') }}
            </label>
            <input
              type="email"
              v-model="formData.email"
              :placeholder="localeStore.t('contact.form.email.placeholder')"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              {{ localeStore.t('contact.form.subject.label') }}
            </label>
            <input
              type="text"
              v-model="formData.subject"
              :placeholder="localeStore.t('contact.form.subject.placeholder')"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              {{ localeStore.t('contact.form.message.label') }}
            </label>
            <textarea
              v-model="formData.message"
              :placeholder="localeStore.t('contact.form.message.placeholder')"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ localeStore.t('contact.form.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // TODO: Implement form submission logic
  setTimeout(() => {
    isSubmitting.value = false
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }, 1000)
}
</script> 