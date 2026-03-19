<template>
  <section class="stats">
    <div class="container stats-grid">
      <template v-for="(stat, index) in stats" :key="index">
        <div class="stat-item">
          <img :src="stat.icon" class="stat-icon-img" :alt="stat.label" />
          <span class="stat-number">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
        <div v-if="index < stats.length - 1" class="divider"></div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
// 하단 통계 데이터
const stats = ref([
  { value: '50+', label: 'Partners', icon: '/images/icon-partner.png' },
  { value: '1,200+', label: 'Product', icon: '/images/icon-product.png' },
  { value: '24h', label: 'Delivery', icon: '/images/icon-delivery.png' },
])
</script>

<style scoped>
/* 통계 (Stats) - 아이콘 크기 수정 (100px) */
.stats {
  background: #f9f9f9;
  padding: 30px 0;
  border-top: 1px solid #eee;
}
.stats-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 100px;
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 아이콘 크기 100px */
.stat-icon-img {
  width: 110px;
  height: 110px;
  margin-bottom: 20px;
  object-fit: contain;
  display: block;
}

.stat-number {
  font-size: 40px;
  font-weight: 800;
  color: #1a2b4c;
  margin-bottom: 8px;
}
.stat-label {
  font-size: 16px;
  color: #666;
  font-weight: 500;
}
.divider {
  width: 1px;
  height: 80px;
  background: #ddd;
}

/* 모바일 반응형 디자인 (768px 이하) */
@media (max-width: 768px) {
  .stats-grid {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0 10px;
    gap: 10px;
  }

  .stat-item {
    flex: 1; /* 새 아이템이 동일한 너비를 가짐 */
  }

  .stat-icon-img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }

  .divider {
    display: none; /* 세로 배치이므로 세로선 숨김 */
  }

  .stat-number {
    font-size: 20px;
  }

  .stat-label {
    font-size: 12px;
  }
}
</style>
