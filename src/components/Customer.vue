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
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle sm:max-w-3xl sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
          <div>
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3
                class="text-2xl leading-6 font-semibold text-gray-900 mb-3"
                id="modal-title"
              >
                {{ localeStore.t('services.orderSuccess') }}
              </h3>
            </div>
            <div>
              <img width="500" src="./WechatIMG6.jpg" alt="">
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, computed } from 'vue';
import { useLocaleStore } from '@/stores/locale';
const localeStore = useLocaleStore();

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();


// 关闭弹窗
const close = () => {
  emit('close');
};
</script>

<script lang="ts">
export default {
  name: 'Customer',
};
</script>
