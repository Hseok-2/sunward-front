<template>
  <div class="product-detail">
    <section class="hero-section">
      <div class="container hero-inner">
        <div class="text-box">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-subtitle">{{ product.subtitle }}</p>
          <p class="product-desc">{{ product.description }}</p>

          <div class="button-group">
            <button class="btn btn-teal"><i class="icon-download"></i> 카탈로그</button>
            <button class="btn btn-dark"><i class="icon-inquiry"></i> 제품문의</button>
            <button class="btn btn-dark"><i class="icon-document"></i> 제품자료실</button>
          </div>
        </div>

        <div class="image-box">
          <div class="image-wrapper">
            <img :src="product.image" :alt="product.title" class="product-img" />
          </div>
        </div>
      </div>
    </section>

    <div class="tab-menu-wrapper">
      <div class="tab-menu">
        <RouterLink to="/product/deco-tile" class="tab-item">데코타일</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/product/roll-sheet" class="tab-item">롤시트</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/product/flooring" class="tab-item">마루</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/product/wallpaper" class="tab-item">벽지</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/product/interior-film" class="tab-item">인테리어 필름</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/product/wall-panel" class="tab-item">벽장재</RouterLink>
      </div>
    </div>

    <section class="specs-section">
      <div class="container">
        <div class="spec-row" v-for="(spec, index) in product.specs" :key="index">
          <div class="spec-title-box">
            <h3 class="spec-title">{{ spec.label }}</h3>
          </div>

          <div class="spec-content">
            <ul class="spec-list">
              <li v-for="(item, i) in spec.items" :key="i">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 현재 화면에 보여줄 제품 데이터를 담는 변수
const product = ref({
  title: '',
  subtitle: '',
  description: '',
  image: '',
  specs: [],
})

// 가상의 제품 데이터베이스 (나중에 백엔드 API로 대체 가능)
const productDB = {
  'deco-tile': {
    title: '데코 타일',
    subtitle: 'High-Performance Commercial Tile',
    description: 'SUNWARD 데코타일은 우수한 내마모성과 다양한 디자인 패턴을 갖춘 바닥재입니다.',
    image: '/images/deco-tile.png',
    specs: [
      { label: '용도', items: ['사무실, 상가 등 상업 공간', '학교, 병원 등 공공/교육 시설'] },
      { label: '특징', items: ['탁월한 내마모성 및 내구성', '다양한 리얼 우드/스톤 텍스처 구현'] },
      { label: '규격', items: ['3.0mm(T) x 450mm x 450mm'] },
    ],
  },
  'roll-sheet': {
    title: '롤시트',
    subtitle: 'Premium Roll Sheet Floor',
    description: '이음새가 적어 위생적이고 청소가 용이한 롤시트 바닥재입니다.',
    image: '/images/roll-sheet.png',
    specs: [
      { label: '용도', items: ['병원, 요양원, 유치원, 복도 등'] },
      { label: '특징', items: ['이음새 최소화로 우수한 위생성', '항균 및 항바이러스 특수 코팅'] },
    ],
  },
  flooring: {
    title: '마루',
    subtitle: 'Eco-friendly Wood Flooring',
    description: '자연스러운 나무 질감과 뛰어난 보행감을 자랑하는 친환경 마루입니다.',
    image: '/images/flooring.png',
    specs: [
      { label: '용도', items: ['아파트, 주택 등 주거 공간', '고급 상업 시설 및 휴게 공간'] },
      {
        label: '특징',
        items: ['자연 친화적 소재 사용', '탁월한 스크래치 및 찍힘 방지', '우수한 열 전도율'],
      },
      { label: '규격', items: ['7.5mm(T) x 95mm x 800mm'] },
    ],
  },
  wallpaper: {
    title: '벽지',
    subtitle: 'Stylish & Safe Wallpaper',
    description: '감각적인 디자인과 안전한 소재로 공간의 품격을 높여주는 실크/합지 벽지입니다.',
    image: '/images/wallpaper.png',
    specs: [
      { label: '용도', items: ['거실, 침실 등 주거 공간', '호텔, 레스토랑 등 상업 공간 벽면'] },
      {
        label: '특징',
        items: ['세련되고 다채로운 패턴', '우수한 항균 및 방염 성능', '오염에 강한 표면 코팅'],
      },
    ],
  },
  'interior-film': {
    title: '인테리어 필름',
    subtitle: 'High-Quality Interior Film',
    description: '간편한 시공으로 가구와 몰딩의 분위기를 완벽하게 바꿔주는 고품질 필름입니다.',
    image: '/images/interior-film.png',
    specs: [
      { label: '용도', items: ['도어, 샷시, 가구, 몰딩 등 표면 리폼', '상가 내부 아트월'] },
      {
        label: '특징',
        items: ['리얼한 소재 질감 구현 (우드, 스톤, 메탈 등)', '강력한 점착력과 내구성'],
      },
      { label: '규격', items: ['1220mm(W) x 50m(L) / 1롤'] },
    ],
  },
  'wall-panel': {
    title: '벽장재',
    subtitle: 'Decorative Wall Panel',
    description: '입체적인 텍스처와 모던한 디자인으로 벽면을 고급스럽게 연출하는 벽장재입니다.',
    image: '/images/wall-panel.png',
    specs: [
      { label: '용도', items: ['거실 아트월, 로비, 회의실, 엘리베이터 홀'] },
      {
        label: '특징',
        items: [
          '뛰어난 오염 방지 및 유지보수성',
          '충격에 강한 고강도 소재',
          '다양한 패턴 조합 가능',
        ],
      },
      { label: '두께', items: ['6.0mm(T)'] },
    ],
  },
  // 필요한 제품들을 계속 추가할 수 있습니다.
}

// URL에 따라 데이터를 교체하는 함수
const loadProductData = () => {
  const categoryName = route.params.category
  const data = productDB[categoryName] || productDB['deco-tile']

  product.value = data
}

// 1. 페이지가 처음 열릴 때 데이터 로드
onMounted(() => {
  loadProductData()
})

// 2. 헤더 메뉴를 통해 다른 제품을 클릭했을 때 (URL이 바뀔 때) 즉시 데이터 교체
watch(
  () => route.params.category,
  () => {
    loadProductData()
  },
)
</script>

<style scoped>
/* 공통 컨테이너 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 히어로 섹션 */
.hero-section {
  background: #f8f9fa url('https://www.transparenttextures.com/patterns/cubes.png');
  padding: 100px 0;
  border-bottom: 1px solid #eaeaea;
}

.hero-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
}

.text-box {
  flex: 1;
}

.product-title {
  font-size: 56px;
  font-weight: 900;
  color: #111;
  margin-bottom: 10px;
  letter-spacing: -2px;
}

.product-subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 25px;
  font-weight: 500;
}

.product-desc {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 40px;
  word-break: keep-all;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 12px 24px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-teal {
  background-color: #38b2ac; /* 민트/청록색 */
  color: white;
}

.btn-dark {
  background-color: #4a5568; /* 짙은 회색 */
  color: white;
}

/* 이미지 박스 */
.image-box {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.image-wrapper {
  width: 500px;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 스펙 섹션 */
.specs-section {
  padding: 80px 0;
  background-color: #fff;
}

.spec-row {
  display: flex;
  margin-bottom: 50px;
}

.spec-title-box {
  width: 200px;
  position: relative;
}

.spec-title-box::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 0;
  width: 30px;
  height: 4px;
  background-color: #111;
}

.spec-title {
  font-size: 22px;
  font-weight: 800;
  color: #222;
}

.spec-content {
  flex: 1;
}

.spec-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; /* 내용이 길면 다음 줄로 넘어감 */
  gap: 20px;
}

.spec-list li {
  font-size: 16px;
  color: #555;
  display: flex;
  align-items: center;
}

.spec-list li::before {
  content: '•';
  color: #38b2ac;
  margin-right: 8px;
  font-size: 20px;
}

/* 플로팅 탭 메뉴 스타일 */
.tab-menu-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -35px; /* 히어로 배너 위로 반쯤 걸치게 끌어올림 */
  position: relative;
  z-index: 10;
}

.tab-menu {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 70px;
  border-radius: 35px; /* 둥근 캡슐 모양 */
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

/* 현재 선택된 탭 활성화 디자인 (Vue Router가 자동으로 적용) */
.tab-item.router-link-active {
  color: #38b2ac; /* 제품 페이지의 민트 포인트 컬러 */
}

/* 활성화 탭 아래 작은 삼각형 */
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
</style>
