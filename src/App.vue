<template>
  <div>
    <header>
      <div class="header-inner">
        <div class="logo">SUNWARD</div>
        <nav class="nav">
          <ul>
            <li><a href="#">회사 소개</a></li>
            <li><a href="#">제품 소개</a></li>
            <li><a href="#">고객 지원</a></li>
            <li><a href="/admin">관리자</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <section class="hero">
      <h1>건설의 기초를 짓다, SUNWARD</h1>
      <p>최고의 품질, 합리적인 가격으로 귀하의 현장을 지원합니다.</p>
    </section>

    <section class="container about">
      <div class="about-content">
        <div class="about-img">
          <video autoplay muted loop playsinline @click="toggleMute($event)">
            <source src="/images/about.mp4" type="video/mp4" />
            브라우저가 동영상을 지원하지 않습니다.
          </video>
        </div>
        <div class="about-text">
          <h2>We are Sunward...</h2>
          <p>
            Sunward는 단순한 자재 공급을 넘어 현장의 완공까지 함께하는 든든한 파트너입니다. 최고의
            품질, 합리적인 가격으로 귀하의 현장을 지원합니다.
          </p>
          <button class="btn-line">자세히 보기</button>
        </div>
        <img src="/images/arrow-right.png" class="arrow-icon" alt="더보기" />
      </div>
    </section>

    <section class="container products">
      <h2 class="section-title">Products Line-up</h2>

      <div class="product-wrapper">
        <img src="/images/arrow-left.png" class="arrow-icon" alt="이전" />

        <div class="product-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <div class="product-img">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-name">{{ product.name }}</div>
          </div>
        </div>

        <img src="/images/arrow-right.png" class="arrow-icon" alt="다음" />
      </div>
    </section>

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

    <section class="cta">
      <h2>찾으시는 자재가 있으신가요?</h2>
      <p>온라인으로 간편하게 견적을 문의하세요.</p>
      <button class="btn-orange">견적 문의하기</button>
    </section>

    <footer class="footer">
      <div class="container">
        <span class="footer-logo">SUNWARD</span>
        <div class="footer-info">
          <p>대표자 : 윤혜진 | 사업자등록번호 : 402-88-01787</p>
          <p>
            경기도 성남시 수정구 달래내로 388, 2층(창곡동) | 전화 : 031-759-4370 | 팩스 :
            031-759-4384
          </p>
        </div>
        <p class="copyright">© 2026 SUNWARD. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 💡 1. 자재 목록 데이터 (나중에는 Spring Boot DB에서 받아올 예정입니다!)
const products = ref([
  { id: 1, name: '데코타일', image: '/images/product1.png' },
  { id: 2, name: '마루', image: '/images/product2.png' },
  { id: 3, name: '벽지', image: '/images/product3.png' },
  { id: 4, name: '롤시트', image: '/images/product4.png' },
  { id: 5, name: '인테리어 필름', image: '/images/interior_film.png' },
])

// 💡 2. 하단 통계 데이터
const stats = ref([
  { value: '50+', label: 'Partners', icon: '/images/icon-partner.png' },
  { value: '1,200+', label: 'Product', icon: '/images/icon-product.png' },
  { value: '24h', label: 'Delivery', icon: '/images/icon-delivery.png' },
])

// 💡 3. 비디오 음소거 토글
const toggleMute = (event) => {
  const video = event.target
  video.muted = !video.muted
}
</script>

<style scoped>
/* 기존에 가지고 계신 style.css 파일의 내용을 여기에 복사해 넣으시거나,
프로젝트 전역 CSS 파일로 설정해 두시면 됩니다. 
*/
</style>
