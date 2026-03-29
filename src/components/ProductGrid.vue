<template>
  <section class="container products">
    <h2 class="section-title">Products Line-up</h2>

    <div class="product-wrapper">
      <img src="/images/arrow-left.png" class="arrow-icon" alt="이전" @click="prevProduct" />

      <div class="product-grid">
        <div class="product-track" :style="trackStyle">
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
            @click="goToProductList(product.slug)"
            style="cursor: pointer"
          >
            <div class="product-img">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-name">{{ product.name }}</div>
          </div>
        </div>
      </div>

      <img src="/images/arrow-right.png" class="arrow-icon" alt="다음" @click="nextProduct" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🚩 카테고리 슬러그(slug) 매칭 완료
const products = ref([
  { id: 1, name: '바닥재(타일)', image: '/images/deco-tile.png', slug: 'flooring-tile' },
  { id: 2, name: '바닥재(시트)', image: '/images/roll-sheet.png', slug: 'flooring-sheet' },
  { id: 3, name: '바닥재(마루)', image: '/images/flooring.png', slug: 'flooring-wood' },
  { id: 4, name: '벽지&벽장재', image: '/images/wallpaper.png', slug: 'wallpaper-wallpanel' },
  { id: 5, name: '단열재', image: '/images/wall-panel.png', slug: 'insulation' },
])

// ProductListView.vue 의 해당 카테고리로 부드럽게 이동!
const goToProductList = (slug) => {
  router.push(`/product-list/${slug}`)
}

// 슬라이더 애니메이션 상태 관리 (기존 로직 완벽 유지)
const trackStyle = ref({ transform: 'translateX(0px)', transition: 'none' })
let isAnimating = false // 애니메이션 도중 중복 클릭 방지

// 카드 너비(280px) + 간격(24px) = 한 번에 이동할 거리
const moveDistance = 304

// 다음 버튼 로직
const nextProduct = () => {
  if (isAnimating) return
  isAnimating = true

  // 1. 부드럽게 왼쪽으로 한 칸 이동
  trackStyle.value = {
    transform: `translateX(-${moveDistance}px)`,
    transition: 'transform 0.4s ease-in-out',
  }

  // 2. 이동이 끝나면(0.4초 뒤), 배열 맨 앞을 맨 뒤로 보내고 원위치 시킴
  setTimeout(() => {
    const firstItem = products.value.shift()
    products.value.push(firstItem)

    // 애니메이션 끄고 즉각 원위치
    trackStyle.value = { transform: 'translateX(0px)', transition: 'none' }
    isAnimating = false
  }, 400)
}

// 이전 버튼 로직
const prevProduct = () => {
  if (isAnimating) return
  isAnimating = true

  // 1. 먼저 배열 맨 뒤를 맨 앞으로 가져옴
  const lastItem = products.value.pop()
  products.value.unshift(lastItem)

  // 2. 가져온 카드가 보이지 않도록 전체를 즉각 왼쪽으로 한 칸 밀어둠
  trackStyle.value = { transform: `translateX(-${moveDistance}px)`, transition: 'none' }

  // 3. 브라우저가 화면을 다시 그린 후, 부드럽게 원래 자리(0px)로 이동시킴
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      trackStyle.value = {
        transform: 'translateX(0px)',
        transition: 'transform 0.4s ease-in-out',
      }

      setTimeout(() => {
        isAnimating = false
      }, 400)
    })
  })
}
</script>

<style scoped>
/* 기존 스타일 완벽히 유지 */
.products {
  padding: 80px 0 120px;
  text-align: center;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 60px;
  color: #111;
}

.product-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-width: 1300px;
  margin: 0 auto;
}

.product-grid {
  width: 1192px;
  max-width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
}

.product-track {
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  width: max-content;
}

.product-card {
  width: 280px;
  text-align: left;
  flex-shrink: 0;
  transition: opacity 0.3s;
}

/* 외부 링크임을 살짝 암시하는 hover 효과 추가 */
.product-card:hover {
  opacity: 0.9;
}

.product-img {
  width: 100%;
  height: 280px;
  background: #eee;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 4px;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-img img {
  transform: scale(1.05);
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  color: #111;
}

.arrow-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  object-fit: contain;
  opacity: 0.6;
  transition:
    opacity 0.3s,
    transform 0.3s;
  flex-shrink: 0;
}

.arrow-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .product-wrapper {
    gap: 10px;
  }
  .arrow-icon {
    display: none;
  }
  .product-grid {
    overflow-x: auto;
    width: 100%;
  }
  .product-track {
    transition: none !important;
    transform: none !important;
  }
  .product-card {
    width: 240px;
  }
  .product-img {
    height: 240px;
  }
}
</style>
