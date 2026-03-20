<template>
  <header @mouseleave="isMenuOpen = false">
    <div class="header-inner">
      <RouterLink to="/" class="logo" @mouseenter="isMenuOpen = false" @click="closeMobileMenu">
        SUNWARD
      </RouterLink>

      <div class="nav-center-wrap desktop-only">
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
          </ul>
        </nav>
      </div>

      <div class="right-balancing-space desktop-only"></div>

      <button class="hamburger-btn mobile-only" @click="toggleMobileMenu">
        <span class="line" :class="{ open: isMobileMenuOpen }"></span>
        <span class="line" :class="{ open: isMobileMenuOpen }"></span>
        <span class="line" :class="{ open: isMobileMenuOpen }"></span>
      </button>
    </div>

    <transition name="slide">
      <div v-if="isMenuOpen" class="lnb-container desktop-only">
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
              <li><RouterLink to="/inquiry">문의하기</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay mobile-only">
        <div class="mobile-menu-content">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
              <div class="mobile-nav-title" @click="toggleAccordion('about')">
                회사 소개
                <span class="arrow" :class="{ rotate: activeAccordion === 'about' }">▼</span>
              </div>
              <ul v-show="activeAccordion === 'about'" class="mobile-sub-list">
                <li>
                  <RouterLink to="/about/overview" @click="closeMobileMenu">회사 개요</RouterLink>
                </li>
                <li>
                  <RouterLink to="/about/ceo" @click="closeMobileMenu">CEO 인사말</RouterLink>
                </li>
                <li><RouterLink to="/about/history" @click="closeMobileMenu">연혁</RouterLink></li>
              </ul>
            </li>

            <li class="mobile-nav-item">
              <div class="mobile-nav-title" @click="toggleAccordion('product')">
                제품 소개
                <span class="arrow" :class="{ rotate: activeAccordion === 'product' }">▼</span>
              </div>
              <ul v-show="activeAccordion === 'product'" class="mobile-sub-list">
                <li>
                  <RouterLink to="/product/deco-tile" @click="closeMobileMenu">데코타일</RouterLink>
                </li>
                <li>
                  <RouterLink to="/product/roll-sheet" @click="closeMobileMenu">롤시트</RouterLink>
                </li>
                <li>
                  <RouterLink to="/product/flooring" @click="closeMobileMenu">마루</RouterLink>
                </li>
                <li>
                  <RouterLink to="/product/wallpaper" @click="closeMobileMenu">벽지</RouterLink>
                </li>
                <li>
                  <RouterLink to="/product/interior-film" @click="closeMobileMenu"
                    >인테리어 필름</RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="/product/wall-panel" @click="closeMobileMenu">벽장재</RouterLink>
                </li>
              </ul>
            </li>

            <li class="mobile-nav-item">
              <div class="mobile-nav-title" @click="toggleAccordion('support')">
                고객 지원
                <span class="arrow" :class="{ rotate: activeAccordion === 'support' }">▼</span>
              </div>
              <ul v-show="activeAccordion === 'support'" class="mobile-sub-list">
                <li><RouterLink to="/support" @click="closeMobileMenu">공지사항</RouterLink></li>
                <li><RouterLink to="/inquiry" @click="closeMobileMenu">문의하기</RouterLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// 데스크탑 하위 메뉴의 열림/닫힘 상태를 저장하는 변수
const isMenuOpen = ref(false)

// 모바일 햄버거 메뉴의 열림/닫힘 상태를 저장하는 변수
const isMobileMenuOpen = ref(false)

// 모바일 햄버거 버튼 클릭 시 메뉴 상태를 반전시키고 배경 스크롤을 제어하는 함수
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // 메뉴가 열렸을 때 뒷배경이 스크롤되지 않도록 고정
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

// 모바일 메뉴 내부의 링크를 클릭했을 때 메뉴 창을 닫아주는 함수
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = 'auto'
}

// 모바일 아코디언 메뉴 중 현재 펼쳐져 있는 메뉴의 이름을 저장하는 변수
const activeAccordion = ref('')

// 터치한 모바일 서브 메뉴를 펼치거나 이미 열려있으면 닫아주는 함수
const toggleAccordion = (menu) => {
  activeAccordion.value = activeAccordion.value === menu ? '' : menu
}
</script>

<style scoped>
/* 화면 상단에 헤더를 고정하고 다른 요소들보다 항상 위에 배치 */
header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 1000;
  border-bottom: 1px solid #eaeaea;
}

/* 헤더 내부의 너비를 제한하고 요소들을 양끝으로 배치 */
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

/* 로고 텍스트 스타일 및 모바일 오버레이보다 위로 오도록 z-index 설정 */
.logo {
  width: 150px;
  font-size: 28px;
  font-weight: 900;
  color: #1a2639;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: -1px;
  position: relative;
  z-index: 1001;
}

/* 로고 너비와 동일한 빈 공간을 만들어 중앙 메뉴가 정확히 가운데 정렬되도록 함 */
.right-balancing-space {
  width: 150px;
}

/* 데스크탑 중앙 네비게이션을 묶어주는 래퍼 */
.nav-center-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* 상단 주 메뉴와 하단 서브 메뉴의 가로 간격을 동일하게 맞춤 */
.nav-list,
.lnb-center-wrap {
  display: flex;
  gap: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 상단 주 메뉴와 하단 서브 메뉴 각 항목의 너비를 동일하게 고정 */
.nav-list li,
.sub-list {
  width: 120px;
  text-align: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 상단 네비게이션 링크 텍스트 기본 스타일 지정 */
.nav a {
  color: #333;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  padding: 30px 0;
  display: block;
  position: relative;
}

/* 메뉴 호버 시 나타날 하단 밑줄의 초기 상태 (너비 0) 설정 */
.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background-color: #f39c12;
  transition: width 0.3s ease;
}

/* 마우스를 올리거나 현재 페이지에 해당할 때 밑줄 너비를 100%로 확장 */
.nav a:hover::after,
.nav a.router-link-active::after {
  width: 100%;
}

/* 데스크탑 서브 메뉴 영역의 배경색과 위치 지정 */
.lnb-container {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: #444;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

/* 데스크탑 서브 메뉴 항목들을 화면 정중앙에 모아줌 */
.lnb-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 20px 20px 30px 20px;
}

/* 데스크탑 서브 메뉴 항목 간의 세로 여백 설정 */
.sub-list li {
  margin-bottom: 15px;
}

/* 데스크탑 서브 메뉴 링크 텍스트 스타일 */
.sub-list a {
  color: #ccc;
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
  transition: 0.2s;
}

/* 데스크탑 서브 메뉴 링크 호버 시 텍스트 색상 및 밑줄 변경 */
.sub-list a:hover {
  color: #f39c12 !important;
  text-decoration: underline;
}

/* 데스크탑 서브 메뉴 슬라이드 애니메이션 효과 설정 */
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

/* 기본적으로 모바일 전용 요소는 화면에서 숨김 */
.mobile-only {
  display: none;
}

/* 모바일 햄버거 버튼 컨테이너 스타일 */
.hamburger-btn {
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

/* 모바일 햄버거 버튼을 구성하는 3개의 선 디자인 */
.hamburger-btn .line {
  width: 100%;
  height: 3px;
  background-color: #1a2639;
  transition: all 0.3s ease;
  border-radius: 10px;
}

/* 햄버거 메뉴 열림 상태일 때 첫 번째 선을 45도 회전 */
.hamburger-btn .line.open:nth-child(1) {
  transform: translateY(8.5px) rotate(45deg);
}

/* 햄버거 메뉴 열림 상태일 때 중간 선을 숨김 */
.hamburger-btn .line.open:nth-child(2) {
  opacity: 0;
}

/* 햄버거 메뉴 열림 상태일 때 세 번째 선을 -45도 회전 */
.hamburger-btn .line.open:nth-child(3) {
  transform: translateY(-8.5px) rotate(-45deg);
}

/* 모바일 전체화면 메뉴 오버레이 레이아웃 설정 */
.mobile-menu-overlay {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #fff;
  z-index: 999;
  overflow-y: auto;
}

/* 모바일 메뉴 내부 컨텐츠 여백 설정 */
.mobile-menu-content {
  padding: 20px;
}

/* 모바일 메뉴 리스트 기본 속성 초기화 */
.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 모바일 메뉴 각 항목 하단 구분선 추가 */
.mobile-nav-item {
  border-bottom: 1px solid #eaeaea;
}

/* 모바일 메뉴 상위 카테고리 제목 영역 디자인 */
.mobile-nav-title {
  padding: 20px 10px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

/* 모바일 메뉴 아코디언 화살표 아이콘 기본 상태 */
.arrow {
  font-size: 14px;
  color: #999;
  transition: transform 0.3s;
}

/* 모바일 아코디언 메뉴가 열렸을 때 화살표 180도 회전 */
.arrow.rotate {
  transform: rotate(180deg);
  color: #f39c12;
}

/* 모바일 하위 서브 메뉴 목록 여백 및 배경색 설정 */
.mobile-sub-list {
  list-style: none;
  padding: 0 10px 20px 20px;
  margin: 0;
  background-color: #fcfcfc;
}

/* 모바일 하위 서브 메뉴 각 항목 여백 설정 */
.mobile-sub-list li {
  margin-bottom: 15px;
}

/* 모바일 하위 서브 메뉴 마지막 항목 여백 제거 */
.mobile-sub-list li:last-child {
  margin-bottom: 0;
}

/* 모바일 하위 서브 메뉴 링크 텍스트 스타일 */
.mobile-sub-list a {
  color: #555;
  font-size: 16px;
  text-decoration: none;
  display: block;
}

/* 모바일 하위 서브 메뉴 중 현재 접속 중인 링크 색상 강조 */
.mobile-sub-list a.router-link-active {
  color: #f39c12;
  font-weight: bold;
}

/* 모바일 전체화면 메뉴 페이드 인/아웃 애니메이션 설정 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 태블릿 및 모바일 기기 기준(768px 이하) 미디어 쿼리 적용 */
@media (max-width: 768px) {
  /* 모바일 화면에서는 데스크탑 전용 요소를 강제로 숨김 */
  .desktop-only {
    display: none !important;
  }

  /* 모바일 화면에서 모바일 전용 요소들을 활성화 */
  .mobile-only {
    display: block;
  }

  /* 햄버거 버튼의 flex 레이아웃 구조 유지 */
  .hamburger-btn {
    display: flex;
  }
}
</style>
