<template>
  <div class="product-detail">
    <section class="hero-section">
      <div class="container hero-inner">
        <div class="text-box">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-subtitle">{{ product.subtitle }}</p>
          <p class="product-desc">{{ product.description }}</p>

          <div class="button-group">
            <button class="btn btn-teal">카탈로그</button>
            <button class="btn btn-dark">제품문의</button>
            <button class="btn btn-dark">제품자료실</button>
          </div>
        </div>

        <div class="image-box">
          <div class="image-wrapper">
            <img :src="product.image" :alt="product.title" class="product-img" />
          </div>
        </div>
      </div>
    </section>

    <FloatingTabMenu basePath="/product" />

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
import FloatingTabMenu from '@/components/FloatingTabMenu.vue' // 컴포넌트 불러오기

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
  min-width: 120px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* --- 모바일 반응형 처리 (768px 이하) --- */
@media (max-width: 768px) {
  /* 히어로 섹션 (상단 텍스트 + 이미지 영역) */
  .hero-inner {
    flex-direction: column; /* 가로 배열을 세로 배열로 변경 */
    gap: 30px;
    text-align: center; /* 모바일에서는 텍스트를 중앙 정렬하여 안정감 부여 */
  }

  .text-box,
  .image-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 내부 요소들도 중앙 정렬 */
  }

  .product-title {
    font-size: 36px; /* 모바일에 맞춰 제목 크기 축소 */
  }

  .product-subtitle {
    font-size: 16px;
  }

  /* 버튼 그룹 설정 */
  .button-group {
    flex-wrap: wrap; /* 버튼이 길면 다음 줄로 넘어가도록 설정 */
    justify-content: center;
    width: 100%;
  }

  .btn {
    flex: 1 1 calc(50% - 10px); /* 모바일에서는 버튼을 2개씩 나란히 배치 */
    min-width: unset;
  }

  /* 제품 이미지 설정 */
  .image-wrapper {
    width: 100%; /* 화면 너비에 꽉 차게 변경 */
    height: auto;
    aspect-ratio: 4 / 3; /* 이미지 비율 유지 */
  }

  /* 제품 스펙 영역 */
  .spec-row {
    flex-direction: column; /* 제목과 내용을 세로로 배치 */
    margin-bottom: 30px;
  }

  .spec-title-box {
    width: 100%;
    margin-bottom: 10px;
  }

  .spec-title-box::before {
    top: 50%;
    transform: translateY(-50%);
    left: -15px; /* 타이틀 바 위치를 글자 옆으로 변경 */
    width: 4px;
    height: 18px;
  }

  .spec-title {
    font-size: 18px;
    padding-left: 5px;
  }

  .spec-list {
    flex-direction: column; /* 스펙 내용들도 세로로 나열 */
    gap: 10px;
  }
}
</style>
