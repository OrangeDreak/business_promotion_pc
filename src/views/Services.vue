<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold text-center mb-12">
        {{ localeStore.t('services.title') }}
      </h1>

      <!-- Platform Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="platform in platforms"
          :key="platform"
          @click="selectedPlatform = platform"
          class="px-4 py-2 rounded-full"
          :class="
            selectedPlatform === platform
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          "
        >
          {{ platform }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Loading services...</p>
      </div>

      <!-- Services Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="service in filteredServices"
          :key="service.id"
          class="card hover:shadow-xl transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <img :src="service.icon" :alt="service.title" class="w-6 h-6" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold">{{ service.title }}</h3>
                <p class="text-sm text-gray-600">{{ service.category }}</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">{{ service.description }}</p>
            <div class="text-2xl font-bold text-blue-600 mb-4">
              ${{ service.price }}
            </div>
            <ul class="space-y-2 mb-6">
              <!-- <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-center"
              >
                <svg
                  class="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-600">{{
                  localeStore.t(`services.${feature}`)
                }}</span>
              </li> -->
              {{ localeStore.currentLocale === 'en' ? service.serviceTag :  service.serviceTagEn}}
            </ul>
            <button @click="handlePurchase(service)" class="btn-primary w-full">
              {{ localeStore.t('services.getStarted') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Why Choose Us -->
      <section class="mt-24">
        <h2 class="section-title">
          {{ localeStore.t('services.whyChooseUs') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, key) in features"
            :key="key"
            class="text-center"
          >
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="feature.icon"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">
              {{ localeStore.t(`services.features.${key}.title`) }}
            </h3>
            <p class="text-gray-600">
              {{ localeStore.t(`services.features.${key}.description`) }}
            </p>
          </div>
        </div>
      </section>

      <!-- Fixed Cart Icon -->
      <div class="fixed bottom-8 right-8 z-40">
        <div
          class="bg-white rounded-full shadow-lg p-2 hover:shadow-xl transition-shadow"
        >
          <CartIcon
            @click="$router.push('/cart')"
            class="transform hover:scale-110 transition-transform"
          />
        </div>
      </div>

      <!-- Service Specification Modal -->
      <ServiceSpecModal
        v-if="isModalOpen && selectedService"
        :is-open="isModalOpen"
        :service="selectedService"
        :serviceSku="selectedServiceSku"
        @close="handleModalClose"
        @add="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Service } from '../types';
import { useLocaleStore } from '@/stores/locale';
import { useCartStore } from '@/stores/cart';
import axios from 'axios';
import ServiceSpecModal from '@/components/ServiceSpecModal.vue';
import CartIcon from '@/components/CartIcon.vue';

const localeStore = useLocaleStore();
const cartStore = useCartStore();
const selectedPlatform = ref('All');
const loading = ref(false);
const error = ref<string | null>(null);
const services = ref<Service[]>([]);
const selectedServiceSku = ref<any>([]);

// Modal state
const isModalOpen = ref(false);
const selectedService = ref<Service | null>(null);

// 从API动态获取平台列表
const platforms = ref(['All']);

const features = {
  quality: {
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  delivery: {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  support: {
    icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
  },
};

const filteredServices = computed(() => {
  if (selectedPlatform.value === 'All') {
    return services.value;
  }
  return services.value.filter(
    (service) => service.category === selectedPlatform.value,
  );
});

// 获取服务列表
const fetchServices = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(
      'https://business-promo.com/bp/app/product/all-platform-product',
    );
    if (response.data.code === 200) {
      // 更新平台列表
      platforms.value = [
        'All',
        ...response.data.data.map((platform: any) => platform.nameEn),
      ];

      // 转换API返回的数据格式为我们需要的格式
      const allServices: Service[] = [];

      response.data.data.forEach((platform: any) => {
        if (platform.productDTOList && platform.productDTOList.length > 0) {
          platform.productDTOList.forEach((product: any) => {
            allServices.push({
              id: product.id,
              title: product.titleEn || product.title,
              description: product.desc,
              price: product.price,
              features: [
                'realAccounts',
                'instantDelivery',
                'noPassword',
                'support24',
              ],
              category: platform.nameEn,
              icon: `/icons/${platform.nameEn.toLowerCase()}.svg`,
              status: product.status,
              platform: product.platform,
              productId: 0,
              serviceTag: product.serviceTag,
              serviceTagEn: product.serviceTagEn,
            });
          });
        }
      });

      services.value = allServices;
    } else {
      error.value = response.data.message || 'Failed to fetch services';
    }
  } catch (err) {
    error.value = 'Failed to fetch services';
    console.error('Error fetching services:', err);
  } finally {
    loading.value = false;
  }
};

const handlePurchase = async (service: Service) => {
  const response = await axios.get(
    'https://business-promo.com/bp/app/product/platform-product',
    {
      params: {
        platform: service.platform,
      },
    },
  );
  const skuList = response.data.data.find(
    (item: any) => item.id === service.id,
  ).skuDTOList;
  if (skuList.length > 0) {
    selectedService.value = service;
    selectedServiceSku.value = skuList;
    isModalOpen.value = true;
  } else {
    console.warn('No SKU found for this service');
  }
};

const handleModalClose = () => {
  isModalOpen.value = false;
  selectedService.value = null;
};

const handleAddToCart = (data: {
  service: Service;
  attributes: string;
  attributesEn: string;
  skuId: number;
  platform: number;
  productId: number;
  amount: number;
  type: string;
  price: number;
}) => {
  cartStore.addItem(data);
  // TODO: Show success notification
};

// 组件加载时获取服务列表
onMounted(() => {
  fetchServices();
});
</script>
