import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 관리자 레이아웃 및 대시보드 컴포넌트
import AdminLayout from '../components/admin/AdminLayout.vue'
import DashboardView from '../views/admin/DashboardView.vue'

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
      path: '/product',
      redirect: '/product-list/flooring-tile',
    },
    {
      path: '/inquiry', // 견적 문의 페이지
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
    {
      path: '/support', // 고객 지원 페이지 (목록)
      name: 'support',
      component: () => import('../views/SupportView.vue'),
    },
    // 공지사항 상세 페이지 라우트
    {
      path: '/support/:id',
      name: 'supportDetail',
      component: () => import('../views/SupportDetailView.vue'),
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('../views/LoginView.vue'),
    },
    // 관리자 영역 레이아웃 및 자식 라우트 설정
    {
      path: '/admin',
      component: AdminLayout, // 모든 /admin 하위 페이지는 이 레이아웃을 통과함
      redirect: '/admin/dashboard', // /admin 접속 시 대시보드로 자동 이동
      children: [
        {
          path: 'dashboard', // 실제 경로는 /admin/dashboard
          name: 'adminDashboard',
          component: DashboardView,
        },
        {
          path: 'notice',
          name: 'AdminNotice',
          component: () => import('@/views/admin/NoticeView.vue'),
        },
        {
          path: 'notice/write', // 기존의 '/admin/notice/write'를 자식으로 이동
          name: 'noticeWrite',
          component: () => import('../views/admin/NoticeWriteView.vue'),
        },
        {
          path: 'notice/edit/:id',
          name: 'adminNoticeEdit',
          component: () => import('../views/admin/NoticeEditView.vue'),
        },
        // 🟢 [추가] 앞으로 만들 카테고리와 제품 관리 페이지 라우트 (임시 연결)
        {
          path: 'category',
          name: 'adminCategory',
          // 나중에 CategoryView.vue를 만들고 주석을 해제하거나 껍데기 파일을 연결하세요
          component: () => import('../views/admin/CategoryView.vue'),
        },
        {
          path: 'product',
          name: 'adminProduct',
          // 나중에 ProductView.vue를 만들고 연결하세요
          // component: () => import('../views/admin/ProductView.vue'),
        },
      ],
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
