<template>
  <div id="app-layout">
    <AppHeader />

    <main class="main-content">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
<style>
/* 헤더 높이만큼 윗여백 생성 */
/* PC */
.main-content {
  padding-top: 0;
}

/* 모바일 */
@media (max-width: 768px) {
  .main-content {
    padding-top: 0;
  }
}
</style>
