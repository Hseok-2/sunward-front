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
            @click="goToProductList(product.routePath)"
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
import { useRouter } from 'vue-router' // 라우터 추가

const router = useRouter() // 라우터 사용 준비

// 각 데이터에 이동할 경로 추가
const products = ref([
  { id: 1, name: '데코타일', image: '/images/product1.png', routePath: 'deco-tile' },
  { id: 2, name: '롤시트', image: '/images/product4.png', routePath: 'roll-sheet' },
  { id: 3, name: '마루', image: '/images/product2.png', routePath: 'flooring' },
  { id: 4, name: '벽지', image: '/images/product3.png', routePath: 'wallpaper' },
  { id: 5, name: '인테리어 필름', image: '/images/interior_film.png', routePath: 'interior-film' },
  { id: 6, name: '벽장재', image: '/images/wall-panel.png', routePath: 'wall-panel' },
])

// 카드 클릭 시 리스트 페이지로 이동하는 함수
const goToProductList = (routePath) => {
  router.push(`/product-list/${routePath}`)
}

// 슬라이더 애니메이션 상태 관리
const trackStyle = ref({ transform: 'translateX(0px)', transition: 'none' })
let isAnimating = false // 애니메이션 도중 중복 클릭 방지

// 카드 너비(280px) + 간격(24px) = 한 번에 이동할 거리
const moveDistance = 304

// 다음 버튼
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

//
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

/* 넘치는 건 잘라내기만 함 */
.product-grid {
  width: 1192px;
  max-width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
}

/* 실제 아이템들이 나열되고, 이 통째가 좌우로 움직임 */
.product-track {
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  width: max-content; /* 아이템이 몇 개든 가로로 쭉 늘어서게 함 */
  /* 자바스크립트가 인라인 스타일로 움직임을 제어합니다 */
}

/* 개별 제품 카드 */
.product-card {
  width: 280px;
  text-align: left;
  flex-shrink: 0;
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

/* 화살표 아이콘 */
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

/* 모바일 화면 대응 */
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
