<template>
  <div class="tab-menu-wrapper">
    <div class="tab-menu">
      <template v-for="(category, index) in categories" :key="category.slug">
        <RouterLink :to="`${basePath}/${category.slug}`" class="tab-item">
          {{ category.name }}
        </RouterLink>
        <span v-if="index < categories.length - 1" class="divider">|</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

// 부모 컴포넌트(페이지)로부터 기본 URL 경로를 전달받습니다.
defineProps({
  basePath: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
/* 기존에 있던 탭 메뉴 CSS를 여기에 한 번만 작성합니다. */
.tab-menu-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -35px;
  position: relative;
  z-index: 10;
}

.tab-menu {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 70px;
  border-radius: 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.tab-item {
  color: #555;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 20px;
  position: relative;
  transition: color 0.3s;
}

.divider {
  color: #ddd;
  font-size: 14px;
}

.tab-item.router-link-active {
  color: #38b2ac;
}

.tab-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #38b2ac transparent transparent transparent;
}

@media (max-width: 768px) {
  .tab-menu {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 20px;
    border-radius: 15px;
    justify-content: center;
    gap: 10px;
  }

  .divider {
    display: none;
  }

  .tab-item {
    font-size: 14px;
    padding: 5px 10px;
  }
}
</style>
