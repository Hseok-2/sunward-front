<template>
  <header class="app-header">
    <div class="container header-inner">
      <div class="logo">
        <RouterLink to="/" class="logo-link">
          <img src="/images/sunward-logo.jpg" alt="SUNWARD" class="header-logo" />
        </RouterLink>
      </div>

      <nav class="gnb">
        <ul class="nav-list">
          <li
            class="nav-item has-dropdown"
            @mouseenter="isAboutDropdownOpen = true"
            @mouseleave="isAboutDropdownOpen = false"
          >
            <RouterLink to="/about" class="nav-link">회사 소개</RouterLink>

            <Transition name="fade">
              <ul v-show="isAboutDropdownOpen" class="dropdown-menu">
                <li v-for="category in aboutCategories" :key="category.slug" class="dropdown-item">
                  <RouterLink :to="`/about/${category.slug}`" class="dropdown-link">
                    {{ category.name }}
                  </RouterLink>
                </li>
              </ul>
            </Transition>
          </li>

          <li
            class="nav-item has-dropdown"
            @mouseenter="isProductDropdownOpen = true"
            @mouseleave="isProductDropdownOpen = false"
          >
            <RouterLink :to="`/product-list/${productCategories[0].slug}`" class="nav-link">
              제품 소개
            </RouterLink>

            <Transition name="fade">
              <ul v-show="isProductDropdownOpen" class="dropdown-menu">
                <li
                  v-for="category in productCategories"
                  :key="category.slug"
                  class="dropdown-item"
                >
                  <RouterLink :to="`/product-list/${category.slug}`" class="dropdown-link">
                    {{ category.name }}
                  </RouterLink>
                </li>
              </ul>
            </Transition>
          </li>

          <li class="nav-item">
            <RouterLink to="/inquiry" class="nav-link">견적 문의</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/support" class="nav-link">고객 지원</RouterLink>
          </li>
        </ul>
      </nav>

      <button
        class="mobile-menu-btn"
        :class="{ 'is-active': isMobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <Transition name="slide-down">
      <div v-show="isMobileMenuOpen" class="mobile-dropdown-menu">
        <ul class="mobile-nav-list">
          <li class="mobile-nav-item">
            <div class="mobile-nav-title">회사 소개</div>
            <ul class="mobile-sub-list">
              <li v-for="category in aboutCategories" :key="category.slug">
                <RouterLink
                  :to="`/about/${category.slug}`"
                  class="mobile-sub-link"
                  @click="toggleMobileMenu"
                >
                  - {{ category.name }}
                </RouterLink>
              </li>
            </ul>
          </li>

          <li class="mobile-nav-item">
            <div class="mobile-nav-title">제품 소개</div>
            <ul class="mobile-sub-list">
              <li v-for="category in productCategories" :key="category.slug">
                <RouterLink
                  :to="`/product-list/${category.slug}`"
                  class="mobile-sub-link"
                  @click="toggleMobileMenu"
                >
                  - {{ category.name }}
                </RouterLink>
              </li>
            </ul>
          </li>

          <li class="mobile-nav-item">
            <RouterLink to="/inquiry" class="mobile-nav-title" @click="toggleMobileMenu"
              >견적 문의</RouterLink
            >
          </li>
          <li class="mobile-nav-item">
            <RouterLink to="/support" class="mobile-nav-title" @click="toggleMobileMenu"
              >고객 지원</RouterLink
            >
          </li>
        </ul>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="toggleMobileMenu"></div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isAboutDropdownOpen = ref(false)
const isProductDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const aboutCategories = ref([
  { name: '회사 개요', slug: 'overview' },
  { name: 'CEO 인사말', slug: 'ceo' },
  { name: '연혁', slug: 'history' },
])

const productCategories = ref([
  { categoryId: 1, name: '바닥재(타일)', slug: 'flooring-tile' },
  { categoryId: 2, name: '바닥재(시트)', slug: 'flooring-sheet' },
  { categoryId: 3, name: '바닥재(마루)', slug: 'flooring-wood' },
  { categoryId: 4, name: '벽지&벽장재', slug: 'wallpaper-wallpanel' },
  { categoryId: 5, name: '단열재', slug: 'insulation' },
])
</script>

<style scoped>
/* --- PC 공통 헤더 스타일 --- */
.app-header {
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1002; /* 드롭다운보다 위에 위치 */
  background-color: #fff;
}

.logo-link {
  text-decoration: none;
  isplay: flex;
  align-items: center;
}

.header-logo {
  height: 60px;
  object-fit: contain;
  display: block;
  margin-top: -2px;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.nav-item {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
}

.nav-link {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
  padding: 10px 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #38b2ac;
}

/* PC 드롭다운 하위 메뉴 */
.dropdown-menu {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 8px 8px;
  padding: 10px 0;
  list-style: none;
  border: 1px solid #f0f0f0;
  border-top: 3px solid #38b2ac;
}

.dropdown-link {
  display: block;
  padding: 12px 25px;
  font-size: 15px;
  color: #555;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.dropdown-link:hover {
  background-color: #f8f9fa;
  color: #38b2ac;
  font-weight: 700;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}

/* --- 모바일 햄버거 버튼 스타일 --- */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 20px;
  padding: 0;
  z-index: 1003;
}

.mobile-menu-btn .bar {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #111;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: left center;
}

/* 햄버거 버튼 클릭 시 X 애니메이션 */
.mobile-menu-btn.is-active .bar:nth-child(1) {
  transform: rotate(45deg);
}
.mobile-menu-btn.is-active .bar:nth-child(2) {
  opacity: 0;
}
.mobile-menu-btn.is-active .bar:nth-child(3) {
  transform: rotate(-45deg);
}

/* --- 모바일 토글 다운 메뉴 스타일 --- */
.mobile-dropdown-menu {
  position: absolute;
  top: 80px; /* 헤더 바로 아래 */
  left: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  z-index: 1001;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav-item {
  border-bottom: 1px solid #f5f5f5;
}

.mobile-nav-title {
  display: block;
  padding: 18px 25px;
  font-size: 16px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
}

.mobile-sub-list {
  list-style: none;
  padding: 10px 0 20px 0;
  margin: 0;
  background-color: #fdfdfd;
}

.mobile-sub-link {
  display: block;
  padding: 10px 25px 10px 35px;
  font-size: 15px;
  color: #666;
  text-decoration: none;
  font-weight: 500;
}

.mobile-sub-link:hover {
  color: #38b2ac;
}

/* 슬라이드 다운 애니메이션 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* 메뉴 활성화 시 헤더 하단 배경 오버레이 */
.mobile-menu-overlay {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

/* 태블릿/모바일 반응형 기준 */
@media (max-width: 992px) {
  .gnb {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
}
</style>
