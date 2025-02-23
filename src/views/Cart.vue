<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold text-center mb-12">
        {{ localeStore.t('cart.title') }}
      </h1>

      <!-- Empty Cart State -->
      <div v-if="!cartStore.items.length" class="text-center py-12">
        <div class="mb-6">
          <svg
            class="w-24 h-24 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold mb-4">
          {{ localeStore.t('cart.empty') }}
        </h2>
        <p class="text-gray-600 mb-8">
          {{ localeStore.t('cart.emptyMessage') }}
        </p>
        <router-link to="/services" class="btn-primary">
          {{ localeStore.t('cart.continueShopping') }}
        </router-link>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items List -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm divide-y">
            <div v-for="item in cartStore.items" :key="item.id" class="p-6">
              <div class="flex items-start">
                <!-- Service Icon -->
                <div
                  class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
                >
                  <img
                    :src="item.service.icon"
                    :alt="item.service.title"
                    class="w-6 h-6"
                  />
                </div>

                <!-- Service Details -->
                <div class="ml-4 flex-grow">
                  <div class="flex justify-between">
                    <div>
                      <h3 class="text-lg font-semibold">
                        {{ item.service.title }}
                      </h3>
                      <p class="text-sm text-gray-600">{{ item.type }}</p>
                    </div>
                    <button
                      @click="cartStore.removeItem(item.id)"
                      class="text-gray-400 hover:text-red-500"
                    >
                      <svg
                        class="w-5 h-5"
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

                  <div class="mt-4 flex items-center justify-between">
                    <div class="text-sm text-gray-600">
                      <!-- {{ formatNumber(item.price) }} followers -->
                      {{ item.attributesEn }}
                    </div>
                    <div class="text-lg font-semibold text-blue-600">
                      ${{ item.price.toFixed(2) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-6">
              {{ localeStore.t('cart.orderSummary') }}
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">{{
                  localeStore.t('cart.subtotal')
                }}</span>
                <span class="font-semibold"
                  >${{ cartStore.totalAmount.toFixed(2) }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">{{
                  localeStore.t('cart.items')
                }}</span>
                <span class="font-semibold">{{ cartStore.totalItems }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">{{
                  localeStore.t('cart.totalFollowers')
                }}</span>
                <span class="font-semibold">{{
                  formatNumber(cartStore.cartItemsCount)
                }}</span>
              </div>
            </div>

            <div class="border-t border-gray-200 my-6"></div>

            <div class="flex justify-between mb-6">
              <span class="text-lg font-semibold">{{
                localeStore.t('cart.total')
              }}</span>
              <span class="text-2xl font-bold text-blue-600"
                >${{ cartStore.totalAmount.toFixed(2) }}</span
              >
            </div>

            <button @click="handleCheckout" class="btn-primary w-full">
              {{ localeStore.t('cart.checkout') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Customer
        v-if="isModalOpen"
        :is-open="isModalOpen"
        @close="handleModalClose"
      />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useLocaleStore } from '@/stores/locale';
import { useCartStore } from '@/stores/cart';
// import { useRouter } from 'vue-router'
import axios from 'axios';
import Customer from '@/components/Customer.vue';
import router from '@/router'


const localeStore = useLocaleStore();
const cartStore = useCartStore();
// const router = useRouter()
const isModalOpen = ref(false);

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};
const handleModalClose = () => {
  isModalOpen.value = false;
};
const handleCheckout = async () => {
  // TODO: Implement checkout logic
  const skuList = cartStore.items.map((item) => ({
    skuId: item.skuId,
    num: 1,
    productId: item.productId,
  }));
  const response: any = await axios.post(
    'https://business-promo.com/bp/app/order/createOrder',
    {
      skuList,
    },
    {
      headers: {
        authorization: localStorage.getItem('token'), // 添加授权头（如果需要）
        language: localStorage.getItem('locale'), // 添加自定义头
      },
      withCredentials: true,
    },
  );
  if(response.data.code ===200){
    isModalOpen.value = true;
  }else{
    router.push('/auth/login')
  }
};
</script>
