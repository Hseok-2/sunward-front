import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about/:section', // 회사 소개 페이지
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/about',
      redirect: '/about/overview',
    },
    {
      path: '/product/:category', //  제품 소개 페이지
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue'),
    },
    {
      path: '/product',
      redirect: '/product/deco-tile',
    },
    {
      path: '/inquiry', // 온라인 문의 페이지
      name: 'inquiry',
      component: () => import('../views/InquiryView.vue'),
    },
    {
      path: '/support', // 고객 지원 페이지
      name: 'support',
      component: () => import('../views/SupportView.vue'),
    },
    {
      path: '/product-list/:category',
      name: 'productList',
      component: () => import('../views/ProductListView.vue'),
    },
  ],

  // 페이지 이동시 스크롤을 맨 위로
  scrollBehavior(to, from, savedPosition) {
    // 뒤로가기/앞으로가기 버튼을 눌렀을 때는 원래 있던 위치로,
    if (savedPosition) {
      return savedPosition
    } else {
      // 새로운 페이지로 부드럽게 이동할 때는 무조건 맨 위로!
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router
