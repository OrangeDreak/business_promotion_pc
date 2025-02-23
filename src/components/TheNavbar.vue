<template>
  <nav class="bg-white shadow-sm">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <img
              src="@/assets/logo.svg"
              alt="BusinessPromo"
              class="h-8 w-auto"
            />
            <span class="ml-2 text-xl font-bold text-gray-900"
              >BusinessPromo</span
            >
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.href"
              class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              :class="{ 'text-blue-600': isCurrentRoute(item.href) }"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Right Side Buttons -->
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <button
            @click="toggleLocale"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
          >
            {{ localeStore.currentLocale.toUpperCase() }}
          </button>

          <!-- Cart Icon -->
          <CartIcon @click="router.push('/cart')" />

          <template v-if="!authStore.isAuthenticated">
            <router-link to="/auth/login" class="btn-primary">
              {{ localeStore.t('nav.login') }}
            </router-link>
          </template>
          <template v-else>
          <div class="relative" v-click-outside="closeDropdown">
            <button 
              @click="toggleDropdown"
              class="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              {{ localeStore.t('nav.my_account') }}
              <svg 
                class="ml-1 h-4 w-4" 
                :class="{ 'transform rotate-180': isDropdownOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Dropdown Menu -->
            <div 
              v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div class="py-1">
                <router-link 
                  to="/orders"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeDropdown"
                >
                  {{ localeStore.t('nav.my_orders') }}
                </router-link>
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ localeStore.t('nav.logout') }}
                </button>
              </div>
            </div>
          </div>
        </template>

          
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="text-gray-600 hover:text-gray-900 p-2"
          >
            <!-- Menu Icon -->
            <svg
              v-if="!isOpen"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Close Icon -->
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600"
          :class="{ 'text-blue-600': isCurrentRoute(item.href) }"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocaleStore } from '@/stores/locale';
import CartIcon from './CartIcon.vue';
import { useAuthStore } from '@/stores/auth'

const route = useRoute();
const isOpen = ref(false);
const localeStore = useLocaleStore();
const authStore = useAuthStore();
const router = useRouter();
const isDropdownOpen = ref(false)

const navigationItems = [
  { name: localeStore.t('nav.services'), href: '/services' },
  // { name: localeStore.t('nav.tools'), href: '/tools' },
  // { name: localeStore.t('nav.blog'), href: '/blog' },
  { name: localeStore.t('nav.about'), href: '/about' },
  { name: localeStore.t('nav.contact'), href: '/contact' },
];

const isCurrentRoute = (path: string) => route.path === path;
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}
const handleLogout = async () => {
  try {
    await authStore.logout()
    closeDropdown()
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
const toggleLocale = () => {
  const newLocale = localeStore.currentLocale === 'en' ? 'zh' : 'en';
  localeStore.setLocale(newLocale);
  // Force update navigation items
  navigationItems.forEach((item, index) => {
    const key = `nav.${item.href.replace('/', '')}`;
    item.name = localeStore.t(key);
  });
};
</script>
