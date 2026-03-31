<template>
  <div class="about-view">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">About SUNWARD</h1>
        <p class="hero-subtitle">회사 소개</p>
      </div>
    </section>

    <div class="tab-menu-wrapper">
      <div class="tab-menu">
        <RouterLink to="/about/overview" class="tab-item">회사 개요</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about/ceo" class="tab-item">CEO 인사말</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about/history" class="tab-item">연혁</RouterLink>
      </div>
    </div>

    <section class="content-section">
      <div class="container">
        <div v-if="currentSection === 'overview'" class="tab-content">
          <h2 class="page-title">회사 개요</h2>

          <div class="overview-box">
            <h3 class="slogan">병원 자재 전문 회사, SUNWARD</h3>
            <p class="slogan-sub">최고의 품질, 합리적인 가격으로 귀하의 현장을 지원합니다.</p>

            <div class="overview-desc">
              <p>
                병원 자재 전문 회사, SUNWARD 차별화된 품질과 정교한 솔루션으로 의료 공간의 가치를
                높입니다.
              </p>
              <br />
              <p>
                선워드(SUNWARD)는 병원 및 의료시설에 특화된 자재를 공급하는 전문 기업으로, 의료
                환경에 요구되는 높은 기준을 충족하는 프리미엄 제품을 제공합니다. 엄격한 품질 관리와
                축적된 기술력을 바탕으로 위생성, 안전성, 내구성을 모두 고려한 자재를 선별하여, 보다
                쾌적하고 신뢰할 수 있는 의료 공간 구현에 기여하고 있습니다.
              </p>
              <br />
              <p>
                앞으로도 끊임없는 고객 맞춤형 솔루션을 통해, 의료 환경의 품격을 한 단계 높이는
                파트너로 함께하겠습니다.
              </p>
            </div>

            <div class="overview-image">
              <img src="/public/images/aboutView.png" alt="회사 전경" />
            </div>
          </div>
        </div>

        <div v-if="currentSection === 'ceo'" class="tab-content">
          <h2 class="page-title">CEO 인사말</h2>
          <div class="ceo-box">
            <div class="ceo-image">
              <img src="/images/ceo-logo.jpg" alt="CEO" />
            </div>
            <div class="ceo-text">
              <h3>"고객의 신뢰를 바탕으로 미래를 짓습니다."</h3>
              <p>안녕하십니까, SUNWARD 대표이사 윤혜진입니다.</p>
              <p>
                당사는 설립 이래 '최고의 품질'과 '합리적인 가격'이라는 두 가지 원칙을 고수하며 건축
                자재 시장에서 굳건히 자리매김해 왔습니다.
              </p>
              <p>
                단순히 자재를 납품하는 것을 넘어, 고객의 비즈니스 성공과 안전한 현장을 위한 든든한
                조력자가 되겠습니다. 항상 저희 SUNWARD를 믿고 성원해 주시는 고객 여러분께 깊은
                감사의 말씀을 드립니다.
              </p>
              <p class="ceo-sign">SUNWARD 대표이사 <strong>윤혜진</strong></p>
            </div>
          </div>
        </div>

        <div v-if="currentSection === 'history'" class="tab-content">
          <h2 class="page-title">연혁</h2>
          <div class="history-box">
            <ul class="history-list">
              <li>
                <div class="year">2026</div>
                <div class="history-details">
                  <p><strong>03</strong> SUNWARD 공식 홈페이지 리뉴얼 오픈</p>
                  <p><strong>01</strong> 프리미엄 데코타일 라인업 확대</p>
                </div>
              </li>
              <li>
                <div class="year">2024</div>
                <div class="history-details">
                  <p><strong>11</strong> ISO 9001 품질경영시스템 인증 획득</p>
                  <p><strong>05</strong> 전국 주요 도시 물류 네트워크 구축</p>
                </div>
              </li>
              <li>
                <div class="year">2021</div>
                <div class="history-details">
                  <p><strong>08</strong> 주식회사 보스파트너스(SUNWARD) 법인 설립</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// URL의 /about/ 뒤에 오는 단어(overview, ceo, history)를 가져옵니다.
const currentSection = computed(() => route.params.section || 'overview')
</script>

<style scoped>
/* 공통 컨테이너 */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* --- 1. 히어로 배너 --- */
.hero-section {
  height: 350px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1600&auto=format&fit=crop')
      center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 80px;
}

.hero-title {
  color: #fff;
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 10px;
}
.hero-subtitle {
  color: #ccc;
  font-size: 18px;
}

/* --- 2. 탭 메뉴 (공통 스타일 유지) --- */
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
  padding: 0 50px;
  height: 70px;
  border-radius: 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.tab-item {
  color: #555;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 30px;
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

/* --- 3. 본문 공통 --- */
.content-section {
  padding: 80px 0 120px;
}
.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #111;
  margin-bottom: 60px;
}
.tab-content {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 회사 개요 스타일 */
.overview-box {
  text-align: center;
}
.slogan {
  font-size: 36px;
  font-weight: 800;
  color: #111;
  margin-bottom: 15px;
}
.slogan-sub {
  font-size: 20px;
  color: #38b2ac;
  font-weight: 600;
  margin-bottom: 40px;
}
.overview-desc {
  font-size: 16px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.overview-image {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.overview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* CEO 인사말 스타일 */
.ceo-box {
  display: flex;
  gap: 50px;
  align-items: center;
}
.ceo-image {
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.ceo-image img {
  width: 100%;
  height: auto;
  display: block;
}
.ceo-text {
  flex: 1.5;
}
.ceo-text h3 {
  font-size: 28px;
  color: #111;
  font-weight: 700;
  margin-bottom: 30px;
}
.ceo-text p {
  font-size: 16px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
  word-break: keep-all;
}
.ceo-sign {
  margin-top: 40px;
  font-size: 18px !important;
  text-align: right;
}
.ceo-sign strong {
  font-size: 22px;
  color: #111;
  margin-left: 10px;
}

/* 연혁 스타일 */
.history-box {
  max-width: 800px;
  margin: 0 auto;
}
.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 2px solid #eaeaea;
}
.history-list li {
  position: relative;
  padding-left: 40px;
  margin-bottom: 50px;
}
.history-list li::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 5px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #38b2ac;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #38b2ac;
}
.year {
  font-size: 28px;
  font-weight: 800;
  color: #38b2ac;
  margin-bottom: 15px;
  line-height: 1;
}
.history-details p {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.history-details strong {
  font-size: 18px;
  color: #111;
  width: 40px;
}
</style>
