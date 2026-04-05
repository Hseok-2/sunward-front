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
            <tr v-if="notices.length === 0">
              <td colspan="4" style="text-align: center; padding: 50px 0">
                등록된 공지사항이 없습니다.
              </td>
            </tr>

            <tr v-for="(item, index) in notices" :key="item.id">
              <td class="col-num">
                <span v-if="item.pinned" class="text-notice">[공지]</span>
                <span v-else>{{ totalElements - currentPage * 10 - index }}</span>
              </td>
              <td class="col-title">
                <RouterLink :to="`/support/${item.id}`" class="board-link">{{
                  item.title
                }}</RouterLink>
              </td>
              <td class="col-date">{{ formatDate(item.createdAt) }}</td>
              <td class="col-views">{{ item.viewCount }}</td>
            </tr>
          </tbody>
        </table>

        <div class="pagination" v-if="totalPages > 0">
          <button class="page-btn arrow" @click="fetchNotices(0)" :disabled="currentPage === 0">
            &laquo;
          </button>
          <button
            class="page-btn arrow"
            @click="fetchNotices(currentPage - 1)"
            :disabled="currentPage === 0"
          >
            &lsaquo;
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page - 1 }"
            @click="fetchNotices(page - 1)"
          >
            {{ page }}
          </button>

          <button
            class="page-btn arrow"
            @click="fetchNotices(currentPage + 1)"
            :disabled="currentPage >= totalPages - 1"
          >
            &rsaquo;
          </button>
          <button
            class="page-btn arrow"
            @click="fetchNotices(totalPages - 1)"
            :disabled="currentPage >= totalPages - 1"
          >
            &raquo;
          </button>
        </div>

        <div class="board-footer">
          <div class="search-area">
            <select class="search-select">
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <input
              type="text"
              class="search-input"
              v-model="searchKeyword"
              @keyup.enter="fetchNotices(0)"
            />
            <button class="btn-search" @click="fetchNotices(0)">검색</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/index' // 작성해둔 axios 인스턴스 가져오기

// 상태 관리 (State)
const notices = ref([]) // 백엔드에서 받아올 공지사항 배열
const searchKeyword = ref('') // 검색어
const currentPage = ref(0) // 현재 페이지 (0부터 시작)
const totalPages = ref(0) // 전체 페이지 수
const totalElements = ref(0) // 전체 데이터 개수 (글 번호 계산용)

// 공지사항 데이터를 백엔드에서 가져오는 함수
const fetchNotices = async (page = 0) => {
  // 첫 페이지나 끝 페이지를 벗어나는 요청 방지
  if (page < 0 || (totalPages.value > 0 && page >= totalPages.value)) return

  try {
    const response = await api.get('/api/notices', {
      params: {
        page: page,
        keyWord: searchKeyword.value,
      },
    })

    // 백엔드 Page 객체 구조에 맞춰 데이터 저장
    notices.value = response.data.content
    totalPages.value = response.data.totalPages
    totalElements.value = response.data.totalElements
    currentPage.value = response.data.number
  } catch (error) {
    console.error('데이터 로드 실패:', error)
    alert('공지사항을 불러오는 데 실패했습니다.')
  }
}

// 백엔드 날짜 형식을 기존 디자인(YY-MM-DD)에 맞게 변환하는 함수
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const yy = String(date.getFullYear()).slice(2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

// 화면이 처음 열릴 때 1페이지(인덱스 0) 데이터 바로 호출
onMounted(() => {
  fetchNotices(0)
})
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

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
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
/* =========================================
   📱 모바일 반응형 설정 (화면 너비 768px 이하)
   ========================================= */
@media (max-width: 768px) {
  /* 1. 히어로 배너 텍스트 크기 조정 */
  .hero-title {
    font-size: 32px;
  }
  .hero-subtitle {
    font-size: 15px;
  }

  /* 2. 본문 여백 및 타이틀 크기 조정 */
  .content-section {
    padding-top: 40px;
  }
  .page-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  /* 3. 게시판 테이블 모바일 최적화 (선택과 집중) */
  .col-num,
  .col-views {
    display: none; /* 모바일에서는 좁으므로 번호와 조회수를 과감히 숨깁니다. */
  }

  .col-title {
    width: 75%;
    padding-left: 10px !important;
  }

  .col-date {
    width: 25%;
    font-size: 13px; /* 날짜 글씨를 살짝 작게 */
  }

  .board-table th,
  .board-table td {
    padding: 15px 0;
  }

  /* 제목이 너무 길면 다음 줄로 넘어가지 않고 '...'으로 말줄임 처리 */
  .board-link {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 4. 페이지네이션 간격 축소 */
  .pagination {
    gap: 8px;
    margin-top: 30px;
  }
  .page-btn {
    font-size: 14px;
  }

  /* 5. 하단 검색 영역 모바일 폭에 꽉 차게 변경 */
  .search-area {
    width: 100%;
    display: flex;
  }
  .search-select {
    width: 80px; /* 셀렉트 박스는 최소한의 크기만 */
  }
  .search-input {
    flex: 1; /* 검색어 입력창이 남은 공간을 모두 차지하도록 늘림 */
    width: auto;
  }
  .btn-search {
    padding: 0 15px;
  }
}
</style>
