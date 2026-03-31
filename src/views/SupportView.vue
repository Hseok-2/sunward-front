<template>
  <div class="support-view">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Customer Support</h1>
        <p class="hero-subtitle">고객지원</p>
      </div>
    </section>

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
                <RouterLink :to="`/support/${item.id}`" class="board-link">{{
                  item.title
                }}</RouterLink>
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
// 기존 ref 대신 방금 만든 noticeData.js에서 전역 데이터를 불러옵니다.
import { globalNotices } from '@/data/noticeData'

// 불러온 전역 데이터를 연결합니다.
const notices = globalNotices
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
  /* 🟡 [수정] 탭 메뉴가 빠졌으므로 타이틀이 정중앙에 오도록 상단 여백 제거 */
  padding-top: 0;
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

/* 🟡 [삭제됨] 플로팅 탭 메뉴 CSS 전체 삭제 완료 */

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
  border-top: 1px solid #333;
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
  border-bottom: 1px dotted #ccc;
  color: #666;
  font-size: 15px;
  text-align: center;
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
  color: #e74c3c;
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
  justify-content: center;
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
