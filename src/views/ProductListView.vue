<template>
  <div class="product-list-view">
    <section class="page-header">
      <div class="container hero-container">
        <div class="hero-text">
          <h1 class="page-title">{{ currentCategory.name }}</h1>
          <p class="category-subtitle">{{ currentCategory.subTitle }}</p>
          <p class="page-desc">{{ currentCategory.description }}</p>
        </div>

        <div class="hero-image">
          <img :src="currentCategory.coverImage" :alt="currentCategory.name" class="cover-img" />
        </div>
      </div>
    </section>

    <FloatingTabMenu basePath="/product-list" :categories="mockCategories" />

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
          <div
            v-for="item in paginatedProducts"
            :key="item.id"
            class="item-card"
            @click="openPortfolio(item.link)"
            style="cursor: pointer"
          >
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
import FloatingTabMenu from '@/components/common/FloatingTabMenu.vue'

const route = useRoute()

// 5개 카테고리 체계 및 커버 이미지 추가
const mockCategories = ref([
  {
    categoryId: 1,
    name: '바닥재(타일)',
    slug: 'flooring-tile',
    subTitle: 'High-Performance Commercial Tile',
    description: 'SUNWARD 타일은 우수한 내마모성과 다양한 디자인 패턴을 갖춘 바닥재입니다.',
    coverImage: '/images/deco-tile.png', // 시안의 우측 이미지 역할
  },
  {
    categoryId: 2,
    name: '바닥재(시트)',
    slug: 'flooring-sheet',
    subTitle: 'Durable & Easy-care Sheet',
    description: '시공이 편리하고 유지관리가 쉬운 롤시트 바닥재입니다.',
    coverImage: '/images/roll-sheet.png',
  },
  {
    categoryId: 3,
    name: '바닥재(마루)',
    slug: 'flooring-wood',
    subTitle: 'Premium Wood Flooring',
    description: '자연스러운 질감과 따뜻한 감성을 담은 프리미엄 마루입니다.',
    coverImage: '/images/flooring.png',
  },
  {
    categoryId: 4,
    name: '벽지&벽장재',
    slug: 'wallpaper-wallpanel',
    subTitle: 'Stylish Wall Coverings',
    description: '공간의 분위기를 완성하는 감각적인 벽지와 벽장재입니다.',
    coverImage: '/images/wallpaper.png',
  },
  {
    categoryId: 5,
    name: '단열재',
    slug: 'insulation',
    subTitle: 'High-Efficiency Insulation',
    description: '우수한 단열 성능으로 에너지 효율을 높여주는 단열재입니다.',
    coverImage: '/images/wall-panel.png',
  },
])

const currentCategory = ref({})

// 외부 포트폴리오 링크를 새 창으로 여는 함수입니다.
const openPortfolio = (url) => {
  if (url) {
    window.open(url, '_blank')
  } else {
    alert('해당 제품의 포트폴리오 링크가 아직 등록되지 않았습니다.')
  }
}

// 제품 Mock Data (Key값 최신화)
const allProductsDB = {
  'flooring-tile': [
    {
      id: 101,
      name: 'LVT 베이직 3T (보타닉)',
      desc: '자연스러운 우드 패턴의 기본형 데코타일',
      image: '/images/deco-1.jpg',
      link: 'https://www.b2bzincatalog.com/digital/samplebook/botanic/',
    },
    {
      id: 102,
      name: 'LVT 스탠다드 3T (에코노플러스)',
      desc: '뛰어난 내구성의 상업용 데코타일',
      image: '/images/deco-2.jpg',
      link: 'https://www.b2bzincatalog.com/digital/samplebook/econoplus/',
    },
    {
      id: 103,
      name: 'LVT 프리미엄 5T (프레스티지)',
      desc: '고급스러운 질감의 프리미엄 데코타일',
      image: '/images/deco-3.jpg',
      link: 'https://www.b2bzincatalog.com/digital/samplebook/prestg/', // 링크가 없는 경우 비워두면 클릭 시 alert 창이 뜹니다.
    },
    {
      id: 104,
      name: 'VCT 베이직 (디럭스)',
      desc: '가성비가 뛰어난 범용 타일',
      image: '/images/deco-4.jpg',
      link: 'https://www.b2bzincatalog.com/digital/samplebook/granddeluxe/',
    },
    {
      id: 105,
      name: 'VCT 스탠다드',
      desc: '오랜시간 사용해도 초기와 같은 외관 유지 타일',
      image: '/images/deco-6.jpg',
      link: 'https://www.b2bzincatalog.com/digital/samplebook/gallant/',
    },
    {
      id: 106,
      name: '하우스 타일 베이직',
      desc: '세련되고 트렌디한 디자인 타일',
      image: '/images/deco-5.jpg',
      link: 'https://www.b2bzincatalog.com/digital/samplebook/house/',
    },

    {
      id: 107,
      name: '하우스 타일 스탠다드',
      desc: '모던한 인더스트리얼 감성',
      image: '/images/deco-7.jpg',
      link: 'https://www.b2bzincatalog.com/digital/samplebook/housestyle/',
    },
  ],
  // ... 나머지 카테고리 데이터 동일
}

const currentCategoryProducts = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

const loadCategoryData = () => {
  const categorySlug = route.params.category
  const foundCategory = mockCategories.value.find((c) => c.slug === categorySlug)
  currentCategory.value = foundCategory || mockCategories.value[0]
  currentCategoryProducts.value = allProductsDB[currentCategory.value.slug] || []
  currentPage.value = 1
  searchQuery.value = ''
}

const filteredProducts = computed(() => {
  if (!searchQuery.value) return currentCategoryProducts.value
  const query = searchQuery.value.toLowerCase()
  return currentCategoryProducts.value.filter(
    (item) => item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query),
  )
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const changePage = (pageNumber) => {
  currentPage.value = pageNumber
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(searchQuery, () => (currentPage.value = 1))
onMounted(loadCategoryData)
watch(() => route.params.category, loadCategoryData)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 1. 상단 타이틀 영역 (시안 기반 2컬럼 레이아웃) */
.page-header {
  background-color: #fcfcfc;
  padding: 100px 0 120px;
  border-bottom: 1px solid #f0f0f0;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}

.hero-text {
  flex: 1;
  text-align: left;
}

.category-subtitle {
  font-size: 26px;
  color: #666;
  font-weight: 400;
  margin-bottom: 20px;
}

.page-title {
  font-size: 52px;
  font-weight: 800;
  color: #111;
  margin-bottom: 25px;
  line-height: 1.2;
}

.page-desc {
  font-size: 17px;
  color: #666;
  line-height: 1.6;
  word-break: keep-all;
}

/* 우측 이미지 스타일 */
.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.cover-img {
  width: 100%;
  max-width: 550px;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* 2. 리스트 섹션 (기존 로직 유지) */
.list-section {
  padding: 80px 0;
}
.search-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
}
.search-box {
  display: flex;
  width: 100%;
  max-width: 400px;
  border: 2px solid #38b2ac;
  border-radius: 30px;
  overflow: hidden;
  background: #fff;
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
  font-weight: bold;
  cursor: pointer;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.item-card {
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  transition: 0.3s;
}
.item-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
}
.item-img-box {
  width: 100%;
  aspect-ratio: 4/3;
  background: #f5f5f5;
}
.item-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item-info {
  padding: 25px 20px;
}
.item-name {
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 10px;
}
.item-desc {
  font-size: 14px;
  color: #777;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 60px;
}
.page-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.page-btn.active {
  background: #38b2ac;
  color: #fff;
  border-color: #38b2ac;
}

/* 모바일 대응 */
@media (max-width: 992px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
  }
  .hero-text {
    text-align: center;
    order: 2;
  }
  .hero-image {
    order: 1;
    width: 100%;
    justify-content: center;
  }
  .page-title {
    font-size: 36px;
  }
  .item-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .item-grid {
    grid-template-columns: 1fr;
  }
}
</style>
