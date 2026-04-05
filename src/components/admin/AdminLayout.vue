<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>ADMIN PANEL</h2>
      </div>
      <nav class="sidebar-menu">
        <router-link to="/admin/dashboard" class="menu-item" active-class="active">
          📊 대시보드
        </router-link>
        <router-link to="/admin/notice" class="menu-item" active-class="active">
          📢 공지사항 관리
        </router-link>
        <router-link to="/admin/product" class="menu-item" active-class="active">
          📦 제품 관리
        </router-link>
        <router-link to="/admin/category" class="menu-item" active-class="active">
          📁 카테고리 관리
        </router-link>
      </nav>
    </aside>

    <div class="main-container">
      <header class="header">
        <div class="header-title">관리자 시스템</div>
        <div class="header-actions">
          <span class="admin-greeting">관리자님, 환영합니다.</span>
          <button @click="handleLogout" class="logout-button">로그아웃</button>
        </div>
      </header>

      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 로그아웃 처리 함수
const handleLogout = () => {
  if (confirm('로그아웃 하시겠습니까?')) {
    // 1. 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('accessToken')

    // 2. 로그인 페이지로 이동
    alert('로그아웃 되었습니다.')
    router.push('/admin/login')
  }
}
</script>

<style scoped>
/* 전체 레이아웃 (화면 꽉 차게) */
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #f4f6f9;
}

/* 사이드바 */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 20px;
  letter-spacing: 1px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.menu-item {
  padding: 15px 20px;
  color: #bdc3c7;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #34495e;
  color: #ffffff;
}

/* 현재 선택된 메뉴 강조 (active-class 속성과 연동) */
.menu-item.active {
  background-color: #4f81e9; /* 로그인 화면의 메인 파란색 사용 */
  color: #ffffff;
  font-weight: bold;
}

/* 우측 컨테이너 (헤더 + 컨텐츠) */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 상단 헤더 */
.header {
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.admin-greeting {
  font-size: 14px;
  color: #666;
}

.logout-button {
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.logout-button:hover {
  background-color: #f8f9fa;
  border-color: #999;
}

/* 실제 페이지 내용 영역 */
.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* 내용이 많아지면 스크롤 생성 */
}
</style>
