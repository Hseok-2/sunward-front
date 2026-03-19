<template>
  <div class="support-view">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Customer Support</h1>
        <p class="hero-subtitle">고객지원</p>
      </div>
    </section>

    <div class="tab-menu-wrapper">
      <div class="tab-menu">
        <RouterLink to="/support" class="tab-item active">공지사항</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/inquiry" class="tab-item">문의하기</RouterLink>
      </div>
    </div>

    <section class="content-section">
      <div class="container">
        <h2 class="page-title">공지사항</h2>

        <table class="board-table">
          <thead>
            <tr>
              <th class="col-num">번호</th>
              <th class="col-title">제목</th>
              <th class="col-date">작성일</th>
              <th class="col-views">조회</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in notices" :key="index">
              <td class="col-num">
                <span v-if="item.isNotice" class="text-notice">[공지]</span>
                <span v-else>{{ item.id }}</span>
              </td>
              <td class="col-title">
                <a href="#" class="board-link">{{ item.title }}</a>
              </td>
              <td class="col-date">{{ item.date }}</td>
              <td class="col-views">{{ item.views }}</td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button class="page-btn arrow">&laquo;</button>
          <button class="page-btn arrow">&lsaquo;</button>
          <button class="page-btn active">1</button>
          <button class="page-btn arrow">&rsaquo;</button>
          <button class="page-btn arrow">&raquo;</button>
        </div>

        <div class="board-footer">
          <div class="search-area">
            <select class="search-select">
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <input type="text" class="search-input" />
            <button class="btn-search">검색</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 가상의 공지사항 데이터 (나중에 백엔드와 연결 시 교체)
const notices = ref([
  {
    id: '공지',
    title: 'SUNWARD 홈페이지를 오픈하였습니다.',
    date: '26-03-20',
    views: 230,
    isNotice: true,
  },
  { id: 3, title: 'SUNWARD 하계 휴무 일정 안내', date: '26-03-15', views: 214, isNotice: false },
  {
    id: 2,
    title: '신제품 (프리미엄 데코타일) 출시 안내',
    date: '26-03-10',
    views: 209,
    isNotice: false,
  },
  {
    id: 1,
    title: 'SUNWARD 고객지원 센터 운영시간 안내',
    date: '26-03-01',
    views: 206,
    isNotice: false,
  },
])
</script>

<style scoped>
/* 전체 컨테이너 및 폰트 설정 */
.support-view {
  background-color: #fff;
  padding-bottom: 100px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 히어로 배너 */
.hero-section {
  height: 350px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('/images/announcement.png') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 80px; /* 헤더 높이만큼 띄움 */
}

.hero-title {
  color: #fff;
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 10px;
}

.hero-subtitle {
  color: #ccc;
  font-size: 18px;
}

/* 플로팅 탭 메뉴 */
.tab-menu-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -35px; /* 위로 끌어올려서 배너에 걸치게 함 */
  position: relative;
  z-index: 10;
}

.tab-menu {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 50px;
  height: 70px;
  border-radius: 35px; /* 둥근 캡슐 모양 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.tab-item {
  color: #555;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 30px;
  position: relative;
  transition: color 0.3s;
}

.divider {
  color: #ddd;
  font-size: 14px;
}

/* 활성화된 탭 스타일 (초록색) */
.tab-item.active {
  color: #2ea043; /* 이미지와 비슷한 초록색 포인트 */
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -15px; /* 탭 메뉴 박스 아래로 삐져나오는 삼각형 */
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #2ea043 transparent transparent transparent;
}

/* 본문 및 게시판 */
.content-section {
  padding-top: 60px;
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 50px;
}

/* 테이블 스타일 */
.board-table {
  width: 100%;
  border-top: 1px solid #333; /* 맨 위 굵은 선 */
  border-collapse: collapse;
}

.board-table th {
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  color: #333;
  font-weight: 600;
  font-size: 15px;
}

.board-table td {
  padding: 20px 0;
  border-bottom: 1px dotted #ccc; /* 이미지처럼 점선 적용 */
  color: #666;
  font-size: 15px;
  text-align: center; /* 기본은 가운데 정렬 */
}

/* 각 열의 너비 지정 */
.col-num {
  width: 10%;
}
.col-title {
  width: 60%;
  text-align: left !important;
  padding-left: 20px !important;
}
.col-date {
  width: 15%;
}
.col-views {
  width: 15%;
}

/* 공지 태그 및 링크 */
.text-notice {
  color: #e74c3c; /* 빨간색 공지 */
  font-weight: bold;
}

.board-link {
  color: #555;
  text-decoration: none;
}
.board-link:hover {
  text-decoration: underline;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
}

.page-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
}

.page-btn.active {
  color: #333;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* 하단 검색 및 버튼 영역 */
.board-footer {
  position: relative;
  margin-top: 40px;
  display: flex;
  justify-content: center; /* 검색창 가운데 정렬 */
  align-items: center;
}

.search-area {
  display: flex;
}

.search-select,
.search-input {
  border: 1px solid #ddd;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
}
.search-select {
  width: 100px;
  color: #666;
}
.search-input {
  width: 250px;
  border-left: none;
  border-right: none;
}

.btn-search {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0 20px;
  font-size: 14px;
  cursor: pointer;
}
</style>
