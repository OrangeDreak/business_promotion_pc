<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <TheNavbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import './assets/main.css'
</script>

<style>
@import './style.css';
</style> 