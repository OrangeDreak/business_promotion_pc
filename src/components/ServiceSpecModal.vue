<!-- Service Specification Modal -->
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="close"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
      >
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            class="bg-white rounded-md text-gray-400 hover:text-gray-500"
            @click="close"
          >
            <span class="sr-only">Close</span>
            <svg
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

        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3
                class="text-2xl leading-6 font-semibold text-gray-900 mb-8"
                id="modal-title"
              >
                {{ service.title }}
              </h3>

              <div class="mt-4">
                <h4 class="text-lg font-medium text-gray-900 mb-4">
                  Select one
                </h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    v-for="spec in serviceSku"
                    :key="spec.id"
                    class="relative rounded-lg border p-4 cursor-pointer transition-all duration-200"
                    :class="[
                      selectedSpec === spec
                        ? 'border-blue-600 bg-blue-100 ring-2 ring-blue-500 ring-opacity-50 shadow-md transform scale-105'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50',
                    ]"
                    @click="selectSpec(spec)"
                  >
                    <div
                      class="text-xl font-bold"
                      :class="
                        selectedSpec === spec
                          ? 'text-blue-700'
                          : 'text-gray-900'
                      "
                    >
                      {{ spec.price.toLocaleString() }}
                    </div>
                    <div class="text-gray-600">{{ spec.attributesEn }}</div>
                    <!-- 显示英文属性 -->
                    <div
                      v-if="selectedSpec === spec"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center animate-scale-in"
                    >
                      <svg
                        class="w-4 h-4 text-white"
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
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 flex items-center justify-between">
                <div>
                  <div class="flex items-center gap-3">
                    <span class="text-3xl font-bold text-gray-900"
                      >${{ finalPrice }}</span
                    >
                    <!-- <span class="text-xl text-gray-500 line-through">${{ originalPrice }}</span> -->
                  </div>
                  <!-- <div class="text-green-600 font-medium">
                    You're saving ${{ savings }}
                  </div> -->
                </div>
                <button
                  type="button"
                  class="btn-primary px-8"
                  @click="handleAdd"
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Service } from '@/types';

const props = defineProps<{
  isOpen: boolean;
  service: Service;
  serviceSku: any;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (
    e: 'add',
    data: {
      service: Service;
      attributes: string;
      attributesEn: string;
      amount: number;
      skuId: number;
      platform: number;
      productId: number;
      type: string;
      price: number;
    },
  ): void;
}>();

const followerTypes = [
  'Regular Followers',
  'Premium Followers',
  'Active Followers',
];

const selectedSpec = ref(props.serviceSku[0]); // 默认选中第一个规格
const selectedType = ref(followerTypes[0]);

// 计算最终价格
const finalPrice = computed(() => {
  const basePrice = selectedSpec.value.price;
  return basePrice.toFixed(2);
});

// 计算原价
// const originalPrice = computed(() => {
//   return (props.service.price * selectedSpec.value.price).toFixed(2)
// })

// 计算节省金额
// const savings = computed(() => {
//   return (Number(originalPrice.value) - Number(finalPrice.value)).toFixed(2)
// })

// 选择规格
const selectSpec = (spec: (typeof props.serviceSku)[0]) => {
  selectedSpec.value = spec;
};

// 关闭弹窗
const close = () => {
  emit('close');
};

// 添加到购物车
const handleAdd = () => {
  emit('add', {
    service: props.service,
    attributes: selectedSpec.value.attributes,
    attributesEn: selectedSpec.value.attributesEn,
    skuId: selectedSpec.value.id,
    platform: props.service.platform,
    productId: props.service.id,
    amount: selectedSpec.value.amount,
    type: selectedType.value,
    price: Number(finalPrice.value),
  });
  close();
};
</script>

<script lang="ts">
export default {
  name: 'ServiceSpecModal',
};
</script>
