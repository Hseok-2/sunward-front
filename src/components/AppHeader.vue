<template>
  <header @mouseleave="isMenuOpen = false">
    <div class="header-inner">
      <RouterLink to="/" class="logo" @mouseenter="isMenuOpen = false"> SUNWARD </RouterLink>

      <div class="nav-center-wrap">
        <nav class="nav">
          <ul class="nav-list">
            <li @mouseenter="isMenuOpen = true">
              <RouterLink to="/about/overview">회사 소개</RouterLink>
            </li>
            <li @mouseenter="isMenuOpen = true">
              <RouterLink to="/product/deco-tile">제품 소개</RouterLink>
            </li>
            <li @mouseenter="isMenuOpen = true">
              <RouterLink to="/support">고객 지원</RouterLink>
            </li>
            <!-- <li @mouseenter="isMenuOpen = true"><RouterLink to="/admin">관리자</RouterLink></li> -->
          </ul>
        </nav>
      </div>

      <div class="right-balancing-space"></div>
    </div>

    <transition name="slide">
      <div v-if="isMenuOpen" class="lnb-container">
        <div class="lnb-inner">
          <div class="lnb-center-wrap">
            <ul class="sub-list">
              <li><RouterLink to="/about/overview">회사 개요</RouterLink></li>
              <li><RouterLink to="/about/ceo">CEO 인사말</RouterLink></li>
              <li><RouterLink to="/about/history">연혁</RouterLink></li>
            </ul>

            <ul class="sub-list">
              <li><RouterLink to="/product/deco-tile">데코타일</RouterLink></li>
              <li><RouterLink to="/product/roll-sheet">롤시트</RouterLink></li>
              <li><RouterLink to="/product/flooring">마루</RouterLink></li>
              <li><RouterLink to="/product/wallpaper">벽지</RouterLink></li>
              <li><RouterLink to="/product/interior-film">인테리어 필름</RouterLink></li>
              <li><RouterLink to="/product/wall-panel">벽장재</RouterLink></li>
            </ul>

            <ul class="sub-list">
              <li><RouterLink to="/support">공지사항</RouterLink></li>
              <li><RouterLink to="/support">문의하기</RouterLink></li>
            </ul>
            <!-- 
            <ul class="sub-list">
              <li><RouterLink to="/admin">대시보드</RouterLink></li>
            </ul> -->
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
</script>

<style scoped>
/* --- 1. 헤더 레이아웃 --- */
header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 1000;
  border-bottom: 1px solid #eaeaea;
}

.header-inner {
  width: 100%;
  max-width: 1200px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

/* 로고와 우측 밸런스 공간을 정확히 150px로 일치 */
.logo {
  width: 150px;
  font-size: 28px;
  font-weight: 900;
  color: #1a2639;
  text-decoration: none;
  display: flex;
  justify-content: flex-start; /* 왼쪽으로 밀착 */
  align-items: center;
  letter-spacing: -1px;
}
.right-balancing-space {
  width: 150px;
}

/* 중앙 메뉴 래퍼 */
.nav-center-wrap {
  flex: 1;
  display: flex;
  justify-content: center; /* 화면 정중앙 */
}

/* 상단 메뉴와 하단 메뉴의 박스 크기를 완벽하게 일치시킴 */
.nav-list,
.lnb-center-wrap {
  display: flex;
  gap: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 🚩 [핵심 2] 상단 메뉴 한 칸(li)과 하단 메뉴 한 칸(.sub-list)의 너비 고정 */
.nav-list li,
.sub-list {
  width: 120px; /* 🚩 상/하 너비 똑같이 120px 고정 */
  text-align: center; /* 🚩 텍스트 정중앙 정렬 */
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav a {
  color: #333;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  padding: 30px 0;
  display: block;
  position: relative;
}

/* 호버 라인 효과 */
.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); /* 가운데서부터 선이 커지게 */
  width: 0;
  height: 3px;
  background-color: #f39c12;
  transition: width 0.3s ease;
}

.nav a:hover::after,
.nav a.router-link-active::after {
  width: 100%;
}

/* --- 2. 서브 메뉴 (LNB) --- */
.lnb-container {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: #444; /* 짙은 회색 배경 */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.lnb-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center; /* 🚩 LNB도 화면 정중앙으로 모음 */
  padding: 20px 20px 30px 20px;
}

/* 하위 리스트 세부 스타일 */
.sub-list li {
  margin-bottom: 15px;
}

.sub-list a {
  color: #ccc;
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
  transition: 0.2s;
}

.sub-list a:hover {
  color: #f39c12 !important;
  text-decoration: underline;
}

/* 애니메이션 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 400px;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
