<template>
  <div class="my-orders" @scroll="handleScroll" ref="ordersContainer">
    <h2 class="page-title">My Orders</h2>
    <div class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-info">
            <span class="order-no">Order #{{ order.orderNo }}</span>
            <span class="order-date">{{ formatDate(order.gmtCreate) }}</span>
          </div>
          <div class="order-status" :class="getStatusClass(order.orderStatus)">
            {{ getStatusText(order.orderStatus) }}
          </div>
        </div>

        <div class="order-items">
          <div
            v-for="item in order.orderItemVOList"
            :key="item.id"
            class="order-item"
          >
            <div class="item-info">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-attrs">{{ item.attributes }}</p>
              <p class="item-attrs">
                {{
                  localeStore.currentLocale === 'en' ? item.propEn : item.prop
                }}
              </p>
              <div class="item-details">
                <span class="item-price"
                  >{{ order.currency }} {{ item.price }}</span
                >
                <span class="item-quantity">x{{ item.skuCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <div class="total-amount">
            Total: <span>{{ order.currency }} {{ order.totalAmount }}</span>
          </div>
          <div class="platform-info">
            <div @click="isModalOpen = true">
              {{ localeStore.t('nav.contact') }}
            </div>
            <span>Platform: {{ order.platformName }}</span>
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

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Customer from '@/components/Customer.vue';
import { useLocaleStore } from '@/stores/locale';

const orders = ref([]);
const isModalOpen = ref(false);
const localeStore = useLocaleStore();
const pageNo = ref(1);
const pageSize = 20;
const ordersContainer = ref(null);

onMounted(() => {
  fetchOrders();
  window.addEventListener('scroll', handleScroll);
});

const handleModalClose = () => {
  isModalOpen.value = false;
};

const fetchOrders = async () => {
  try {
    const response = await axios.post(
      'https://business-promo.com/bp/app/order/myOrderList',
      {
        pageNo: pageNo.value,
        pageSize: pageSize,
        offset: (pageNo.value - 1) * pageSize,
      },
      {
        headers: {
          authorization: localStorage.getItem('token'),
          language: localStorage.getItem('locale'),
        },
        withCredentials: true,
      },
    );
    orders.value.push(...response.data.data); // 添加新订单到现有订单列表
    pageNo.value++; // 增加页码以便下次加载
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

const handleScroll = () => {
  const container = ordersContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    fetchOrders(); // 当滚动到达底部时加载更多订单
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

const getStatusText = (status) => {
  const statusMap = {
    0: 'Pending',
    1: 'Processing',
    2: 'Shipped',
    3: 'Delivered',
    4: 'Cancelled',
  };
  return statusMap[status] || 'Unknown';
};

const getStatusClass = (status) => {
  const classMap = {
    0: 'status-pending',
    1: 'status-processing',
    2: 'status-shipped',
    3: 'status-delivered',
    4: 'status-cancelled',
  };
  return classMap[status] || '';
};
</script>

<style scoped>
.my-orders {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.order-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.order-no {
  font-weight: bold;
  margin-right: 12px;
}

.order-date {
  color: #666;
}

.order-status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}
.status-processing {
  background: #cce5ff;
  color: #004085;
}
.status-shipped {
  background: #d4edda;
  color: #155724;
}
.status-delivered {
  background: #d1e7dd;
  color: #0f5132;
}
.status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-items {
  padding: 16px 0;
}

.order-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 16px;
  margin: 0 0 8px 0;
}

.item-attrs {
  color: #666;
  font-size: 14px;
  margin: 4px 0;
}

.item-details {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.item-price {
  color: #e53935;
  font-weight: bold;
}

.item-quantity {
  color: #666;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.total-amount {
  font-size: 16px;
  font-weight: bold;
}

.platform-info {
  color: #666;
  font-size: 14px;
}
</style>
