<template>
  <div class="product-list-view">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ categoryTitle }}</h1>
        <p class="page-subtitle">SUNWARD의 고품질 {{ categoryTitle }} 라인업을 확인해 보세요.</p>
      </div>
    </section>

    <FloatingTabMenu basePath="/product-list" />

    <section class="list-section">
      <div class="container">
        <div class="search-wrap">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="찾으시는 제품명을 입력하세요."
              class="search-input"
            />
            <button class="search-btn">검색</button>
          </div>
        </div>

        <div v-if="paginatedProducts.length > 0" class="item-grid">
          <div v-for="item in paginatedProducts" :key="item.id" class="item-card">
            <div class="item-img-box">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-info">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>등록된 제품이 없습니다.</p>
        </div>

        <div v-if="totalPages > 1" class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            &lt;
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import FloatingTabMenu from '@/components/FloatingTabMenu.vue' // 🚩 [추가] 컴포넌트 불러오기

const route = useRoute()

// 카테고리별 한글 이름 매핑
const categoryNames = {
  'deco-tile': '데코타일',
  'roll-sheet': '롤시트',
  flooring: '마루',
  wallpaper: '벽지',
  'interior-film': '인테리어 필름',
  'wall-panel': '벽장재',
}

const categoryTitle = ref('')

// 가상의 전체 제품 데이터베이스 (페이징 테스트를 위해 데코타일을 많이 넣었습니다)
const allProductsDB = {
  'deco-tile': [
    {
      id: 101,
      name: 'LVT 베이직 3T (보타닉)',
      desc: '자연스러운 우드 패턴의 기본형 데코타일',
      image: '/images/deco-1.jpg',
    },
    {
      id: 102,
      name: 'LVT 스탠다드 3T (에코노플러스)',
      desc: '뛰어난 내구성의 상업용 데코타일',
      image: '/images/deco-2.jpg',
    },
    {
      id: 103,
      name: 'LVT 프리미엄 5T (프레스티지)',
      desc: '고급스러운 질감의 프리미엄 데코타일',
      image: '/images/deco-3.jpg',
    },
    {
      id: 104,
      name: 'VCT 베이직 (디럭스)',
      desc: '가성비가 뛰어난 범용 타일',
      image: '/images/deco-4.jpg',
    },
    {
      id: 105,
      name: 'LVT 우드 우븐',
      desc: '직조 느낌을 살린 독특한 패턴',
      image: '/images/deco-1.jpg',
    },
    {
      id: 106,
      name: 'LVT 스톤 마블',
      desc: '천연 대리석의 웅장함을 담은 타일',
      image: '/images/deco-2.jpg',
    },
    {
      id: 107,
      name: 'LVT 콘크리트 다크',
      desc: '모던한 인더스트리얼 감성',
      image: '/images/deco-3.jpg',
    },
  ],
  'roll-sheet': [
    {
      id: 201,
      name: '항균 롤시트 2.0T',
      desc: '병원 및 요양시설용 위생 바닥재',
      image: '/images/roll-1.jpg',
    },
  ],
  // ... 다른 카테고리 데이터들 ...
}

// 현재 카테고리의 전체 제품 리스트
const currentCategoryProducts = ref([])

// 사용자가 입력한 검색어
const searchQuery = ref('')

// 페이징 관련 상태 변수
const currentPage = ref(1)
const itemsPerPage = 6 // 한 페이지에 보여줄 제품 개수

// 데이터 불러오기 함수
const loadCategoryData = () => {
  const category = route.params.category
  categoryTitle.value = categoryNames[category] || '제품 리스트'
  currentCategoryProducts.value = allProductsDB[category] || []
  currentPage.value = 1 // 카테고리가 바뀌면 1페이지로 리셋
  searchQuery.value = '' // 카테고리가 바뀌면 검색어도 초기화
}

// 1단계: 전체 데이터에서 검색어(이름 또는 설명)가 포함된 것만 추려냄
const filteredProducts = computed(() => {
  if (!searchQuery.value) return currentCategoryProducts.value

  const query = searchQuery.value.toLowerCase()
  return currentCategoryProducts.value.filter(
    (item) => item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query),
  )
})

// 2단계: '필터링된 결과'를 기준으로 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

// 3단계: '필터링된 결과'를 기준으로 현재 페이지에 보일 6개만 잘라냄
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// 검색어를 입력할 때마다 무조건 1페이지로 돌아가게 만듦
watch(searchQuery, () => {
  currentPage.value = 1
})

// 페이지 변경 함수
const changePage = (pageNumber) => {
  currentPage.value = pageNumber
  window.scrollTo({ top: 0, behavior: 'smooth' }) // 페이지 넘기면 스크롤 위로
}

// 라이프사이클 및 라우터 감지
onMounted(loadCategoryData)
watch(() => route.params.category, loadCategoryData)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 1. 상단 타이틀 영역 */
.page-header {
  background-color: #f8f9fa;
  padding: 60px 0;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  color: #111;
  margin-bottom: 15px;
}

.page-subtitle {
  font-size: 18px;
  color: #666;
}

/* 2. 제품 리스트 그리드 */
.list-section {
  padding: 80px 0;
}

/* CSS Grid를 사용하여 모바일 반응형 대응 */
.item-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* PC에서는 3열 */
  gap: 30px;
}

.item-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
  background-color: #fff;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
}

.item-img-box {
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: #f0f0f0;
  overflow: hidden;
}

.item-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.item-card:hover .item-img-box img {
  transform: scale(1.05);
}

.item-info {
  padding: 25px 20px;
}

.item-name {
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin-bottom: 10px;
}

.item-desc {
  font-size: 15px;
  color: #777;
  line-height: 1.5;
  word-break: keep-all;
}

.empty-state {
  text-align: center;
  padding: 100px 0;
  font-size: 18px;
  color: #999;
}

/* 3. 페이징 영역 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 60px;
}

.page-btn {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #555;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
}

.page-btn:hover:not(:disabled) {
  background-color: #f8f9fa;
  border-color: #999;
}

.page-btn.active {
  background-color: #38b2ac;
  color: #fff;
  border-color: #38b2ac;
  font-weight: bold;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 검색창 디자인 */
.search-wrap {
  display: flex;
  justify-content: flex-end; /* 우측 정렬 */
  margin-bottom: 40px;
}

.search-box {
  display: flex;
  width: 100%;
  max-width: 400px; /* 검색창 최대 너비 */
  border: 2px solid #38b2ac; /* 민트색 테두리 */
  border-radius: 30px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  outline: none;
  font-size: 15px;
}

.search-btn {
  background-color: #38b2ac;
  color: #fff;
  border: none;
  padding: 0 25px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.search-btn:hover {
  background-color: #2e948f;
}

/* 모바일 반응형 처리 */
@media (max-width: 768px) {
  .page-header {
    padding: 40px 0;
  }
  .page-title {
    font-size: 28px;
  }
  .page-subtitle {
    font-size: 15px;
  }
  .item-grid {
    grid-template-columns: repeat(1, 1fr); /* 모바일에서는 무조건 1열 (가로 꽉 차게) */
    gap: 20px;
  }
  .item-info {
    padding: 20px 15px;
  }
  .item-name {
    font-size: 18px;
  }
  .search-wrap {
    justify-content: center; /* 모바일에서는 검색창을 가운데로 */
  }
  .search-box {
    max-width: 100%; /* 화면 꽉 차게 */
  }
}
</style>
