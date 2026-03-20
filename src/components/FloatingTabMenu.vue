<template>
  <div class="tab-menu-wrapper">
    <div class="tab-menu">
      <RouterLink :to="`${basePath}/deco-tile`" class="tab-item">데코타일</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="`${basePath}/roll-sheet`" class="tab-item">롤시트</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="`${basePath}/flooring`" class="tab-item">마루</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="`${basePath}/wallpaper`" class="tab-item">벽지</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="`${basePath}/interior-film`" class="tab-item">인테리어 필름</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="`${basePath}/wall-panel`" class="tab-item">벽장재</RouterLink>
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
