<template>
  <div class="support-detail-view">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Customer Support</h1>
        <p class="hero-subtitle">고객지원</p>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <h2 class="page-title">공지사항</h2>

        <div class="board-detail">
          <div class="detail-header">
            <h3 class="detail-title">
              <span v-if="notice.pinned" class="text-notice">[공지]</span>
              {{ notice.title }}
            </h3>
            <div class="detail-info">
              <span class="info-item"
                ><strong>작성일:</strong> {{ formatDate(notice.createdAt) }}</span
              >
              <span class="info-item"><strong>조회수:</strong> {{ notice.viewCount }}</span>
            </div>
          </div>

          <div class="detail-body">
            <p v-if="notice.content" class="content-text">{{ notice.content }}</p>
            <p v-else class="content-text">내용을 불러오는 중이거나 내용이 없습니다.</p>
          </div>

          <div class="detail-footer">
            <RouterLink to="/support" class="btn-list">목록으로 돌아가기</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/index' // 🟡 [추가] 백엔드 통신을 위한 axios 인스턴스

const route = useRoute()
const router = useRouter()

// 🟡 백엔드 응답 DTO 구조에 맞춰 초기값 세팅
const notice = ref({
  title: '로딩 중...',
  createdAt: '',
  viewCount: 0,
  pinned: false,
  content: '',
})

// 🟡 백엔드 API에서 상세 데이터 가져오기
const fetchNoticeDetail = async (id) => {
  try {
    const response = await api.get(`/api/notices/${id}`)
    notice.value = response.data
  } catch (error) {
    console.error('상세 데이터 로드 실패:', error)
    alert('존재하지 않거나 삭제된 게시글입니다.')
    router.push('/support') // 에러 시 목록으로 강제 이동
  }
}

// 🟡 백엔드 날짜 형식을 기존 디자인(YY-MM-DD)에 맞게 변환하는 함수 (SupportView와 동일)
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const yy = String(date.getFullYear()).slice(2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

onMounted(() => {
  // URL에서 전달받은 ID 값 추출 후 API 호출
  const id = route.params.id
  fetchNoticeDetail(id)
})
</script>

<style scoped>
.support-detail-view {
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

/* 상세 페이지 게시판 스타일 */
.board-detail {
  border-top: 2px solid #333;
}

.detail-header {
  padding: 25px 20px;
  border-bottom: 1px solid #eaeaea;
  background-color: #fafafa;
}

.detail-title {
  font-size: 22px;
  font-weight: 700;
  color: #111;
  margin-bottom: 15px;
}

.text-notice {
  color: #e74c3c;
  margin-right: 5px;
}

.detail-info {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.detail-body {
  padding: 50px 20px;
  min-height: 300px;
  border-bottom: 1px solid #333;
}

/* 🟡 [추가] 백엔드에서 입력된 엔터(줄바꿈)가 무시되지 않도록 설정 */
.content-text {
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  white-space: pre-wrap;
}

.detail-footer {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.btn-list {
  display: inline-block;
  padding: 12px 40px;
  background-color: #333;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.btn-list:hover {
  opacity: 0.8;
}

/* =========================================
   📱 모바일 반응형 설정 (화면 너비 768px 이하)
   ========================================= */
@media (max-width: 768px) {
  /* 히어로 배너 축소 */
  .hero-title {
    font-size: 32px;
  }
  .hero-subtitle {
    font-size: 15px;
  }

  .content-section {
    padding-top: 40px;
  }
  .page-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  /* 헤더 영역 패딩 및 폰트 크기 조절 */
  .detail-header {
    padding: 20px 15px;
  }
  .detail-title {
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .detail-info {
    font-size: 13px;
    gap: 15px; /* 모바일에서는 간격을 조금 줄임 */
  }

  /* 본문 영역 패딩 조절 */
  .detail-body {
    padding: 30px 15px;
    min-height: 200px;
  }
  .content-text {
    font-size: 15px; /* 모바일에서 글씨가 너무 크지 않게 살짝 축소 */
  }

  /* 목록 버튼 꽉 차게 */
  .btn-list {
    width: 100%;
    text-align: center;
    padding: 15px 0;
  }
}
</style>
