<template>
  <header class="app-header">
    <div class="container header-inner">
      <div class="logo">
        <RouterLink to="/" class="logo-link">
          <span class="logo-text">SUNWARD</span>
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

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <div v-if="isMobileMenuOpen" class="mobile-menu-overlay"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// 드롭다운 상태 관리를 메뉴별로 분리 및 모바일 메뉴 토글 상태
const isAboutDropdownOpen = ref(false)
const isProductDropdownOpen = ref(false)

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 회사 소개 하위 메뉴 데이터 추가
const aboutCategories = ref([
  { name: '회사 개요', slug: 'overview' },
  { name: 'CEO 인사말', slug: 'ceo' },
  { name: '연혁', slug: 'history' },
])

// 🚩 요구사항 반영: 5개 카테고리 체계 적용 (추후 API/Pinia 스토어 연동)
const productCategories = ref([
  { categoryId: 1, name: '바닥재(타일)', slug: 'flooring-tile' },
  { categoryId: 2, name: '바닥재(시트)', slug: 'flooring-sheet' },
  { categoryId: 3, name: '바닥재(마루)', slug: 'flooring-wood' },
  { categoryId: 4, name: '벽지&벽장재', slug: 'wallpaper-wallpanel' },
  { categoryId: 5, name: '단열재', slug: 'insulation' },
])
</script>

<style scoped>
/* 헤더 전체 레이아웃 */
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
}

/* 로고 영역 */
.logo-link {
  text-decoration: none;
}

.logo-text {
  font-size: 26px;
  font-weight: 900;
  color: #111;
  letter-spacing: 1px;
}

/* 나중에 이미지 로고 주석을 풀었을 때 사용될 CSS 클래스를 미리 적어둠 */
.header-logo {
  height: 40px; /* 헤더 높이(80px)를 고려하여 적절히 조절하세요 */
  object-fit: contain;
  display: block;
}

/* 메인 네비게이션 */
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

/* 드롭다운 하위 메뉴 */
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

/* 드롭다운 트랜지션 효과 */
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

/* 모바일 햄버거 버튼 (PC에서는 숨김) */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
}

.mobile-menu-btn .bar {
  width: 24px;
  height: 2px;
  background-color: #111;
  transition: 0.3s;
}

/* 태블릿/모바일 반응형 */
@media (max-width: 768px) {
  .gnb {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
}
</style>
