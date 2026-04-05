<template>
  <div class="notice-management-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">📢 공지사항 관리</h1>
        <p class="page-desc">등록된 공지사항을 조회하고 관리합니다.</p>
      </div>
      <button @click="goToWrite" class="btn btn-primary">새 공지사항 등록</button>
    </div>

    <div class="card">
      <div class="search-area">
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="검색어를 입력하세요 (제목, 내용)"
          class="input-field search-input"
          @keyup.enter="fetchNotices(0)"
        />
        <button @click="fetchNotices(0)" class="btn btn-dark">검색</button>
      </div>

      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th class="col-num">번호</th>
              <th class="col-title">제목</th>
              <th class="col-date">작성일</th>
              <th class="col-views">조회수</th>
              <th class="col-actions">관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="notices.length === 0">
              <td colspan="5" class="empty-state">등록된 공지사항이 없습니다.</td>
            </tr>
            <tr v-for="(item, index) in notices" :key="item.id">
              <td class="col-num">
                <span v-if="item.pinned" class="pinned-badge">[공지]</span>
                <span v-else>{{ totalElements - currentPage * 10 - index }}</span>
              </td>
              <td class="col-title">
                <span class="notice-title">{{ item.title }}</span>
              </td>
              <td class="col-date">{{ formatDate(item.createdAt) }}</td>
              <td class="col-views">{{ item.viewCount }}</td>

              <td class="col-actions">
                <button @click="goToEdit(item.id)" class="btn btn-outline btn-sm">수정</button>
                <button @click="deleteNotice(item.id)" class="btn btn-danger btn-sm">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index'

const router = useRouter()

// 상태 관리
const notices = ref([])
const searchKeyword = ref('')
const currentPage = ref(0)
const totalPages = ref(0)
const totalElements = ref(0)

// 공지사항 작성 페이지로 이동
const goToWrite = () => {
  router.push('/admin/notice/write')
}

// 공지사항 수정 페이지로 이동
const goToEdit = (id) => {
  router.push(`/admin/notice/edit/${id}`)
}

// 공지사항 목록 조회 (GET)
const fetchNotices = async (page = 0) => {
  if (page < 0 || (totalPages.value > 0 && page >= totalPages.value)) return

  try {
    const response = await api.get('/api/notices', {
      params: {
        page: page,
        keyWord: searchKeyword.value,
      },
    })

    notices.value = response.data.content
    totalPages.value = response.data.totalPages
    totalElements.value = response.data.totalElements
    currentPage.value = response.data.number
  } catch (error) {
    console.error('공지사항 조회 실패:', error)
  }
}

// 공지사항 삭제 (DELETE)
const deleteNotice = async (id) => {
  if (!confirm('정말 이 공지사항을 삭제하시겠습니까?')) return

  try {
    await api.delete(`/api/notices/${id}`)
    alert('삭제되었습니다.')

    // 삭제 후, 현재 페이지에 데이터가 하나만 있었다면 이전 페이지로 이동
    if (notices.value.length === 1 && currentPage.value > 0) {
      fetchNotices(currentPage.value - 1)
    } else {
      fetchNotices(currentPage.value) // 현재 페이지 새로고침
    }
  } catch (error) {
    console.error('삭제 실패:', error)
    alert('삭제에 실패했습니다.')
  }
}

// 날짜 포맷팅 함수 (YY-MM-DD)
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const yy = String(date.getFullYear()).slice(2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

onMounted(() => {
  fetchNotices(0)
})
</script>

<style scoped>
/* =========================================
   기본 레이아웃 및 공통 스타일 (PC 기준)
   ========================================= */
.notice-management-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 5px;
}

.page-desc {
  color: #666;
  font-size: 14px;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  padding: 20px;
}

/* 검색 영역 */
.search-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: flex-end;
}

.search-input {
  width: 250px;
}

.input-field {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.input-field:focus {
  border-color: #4f81e9;
}

/* 버튼 스타일 */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #4f81e9;
  color: white;
}
.btn-primary:hover {
  background-color: #3e70d8;
}

.btn-dark {
  background-color: #333;
  color: white;
}
.btn-dark:hover {
  background-color: #111;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}
.btn-danger:hover {
  background-color: #c0392b;
}

.btn-outline {
  background-color: transparent;
  color: #4f81e9;
  border: 1px solid #4f81e9;
}
.btn-outline:hover {
  background-color: #f0f4ff;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.action-buttons {
  display: flex;
  gap: 5px;
  justify-content: center;
}

/* 테이블 스타일 */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.admin-table th {
  background-color: #f8f9fa;
  padding: 12px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
}

.admin-table td {
  padding: 15px 12px;
  border-bottom: 1px solid #eee;
  color: #555;
  font-size: 14px;
  vertical-align: middle;
}

.col-num {
  width: 10%;
}
.col-title {
  width: 50%;
  text-align: left !important;
}
.col-date {
  width: 15%;
}
.col-views {
  width: 10%;
}
.col-actions {
  width: 15%;
}

.notice-title {
  font-weight: 500;
  color: #333;
}

.pinned-badge {
  color: #e74c3c;
  font-weight: bold;
}

.empty-state {
  padding: 40px !important;
  color: #999 !important;
}

/* 페이지네이션 (고객용 화면과 동일한 스타일) */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
}

.page-btn {
  background: none;
  border: 1px solid transparent;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
}

.page-btn.active {
  background-color: #f1f1f1;
  color: #333;
  font-weight: bold;
  border-color: #ddd;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* =========================================
   태블릿 및 모바일 반응형 설정 (768px 이하)
   ========================================= */
@media (max-width: 768px) {
  .notice-management-container {
    padding: 15px;
  }

  /* 헤더 영역을 세로로 변경 */
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .btn-primary {
    width: 100%;
  }

  /* 검색 영역을 가로로 꽉 차게 */
  .search-area {
    width: 100%;
  }
  .search-input {
    flex: 1;
  }

  /* 테이블 컬럼 숨기기 (선택과 집중) */
  .col-num,
  .col-views {
    display: none;
  }

  .col-title {
    width: 60%;
  }
  .col-date {
    width: 20%;
    font-size: 12px;
  }
  .col-actions {
    width: 20%;
  }
}
</style>
