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
              <span v-if="notice.isNotice" class="text-notice">[공지]</span>
              {{ notice.title }}
            </h3>
            <div class="detail-info">
              <span class="info-item"><strong>작성일:</strong> {{ notice.date }}</span>
              <span class="info-item"><strong>조회수:</strong> {{ notice.views }}</span>
            </div>
          </div>

          <div class="detail-body">
            <p v-if="notice.content">{{ notice.content }}</p>
            <p v-else>
              안녕하세요. 병원 자재 전문 회사 SUNWARD입니다.<br /><br />
              홈페이지 오픈을 맞이하여 새로운 소식을 전해드립니다. <br />
              앞으로 다양한 제품 정보와 유익한 자료로 찾아뵙겠습니다.<br /><br />
              감사합니다.
            </p>
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
import { useRoute } from 'vue-router'
// 공통 데이터와 조회수 증가 함수를 불러옵니다.
import { globalNotices, increaseViewCount } from '@/data/noticeData'

const route = useRoute()

// 화면에 보여줄 임시 데이터 그릇
const notice = ref({
  title: '로딩 중...',
  date: '',
  views: 0,
  isNotice: false,
  content: '',
})

onMounted(() => {
  // URL에서 전달받은 ID 값 (예: /support/1 이면 '1')
  const id = route.params.id

  // 1. 전역 데이터에서 해당 ID를 가진 게시글 찾기 (문자/숫자 타입 차이 방지를 위해 String 변환 후 비교)
  const foundNotice = globalNotices.value.find((n) => String(n.id) === String(id))

  if (foundNotice) {
    // 2. 글을 찾았다면 조회수 1 증가 (로컬 스토리지에 자동 저장됨)
    increaseViewCount(foundNotice.id)

    // 3. 화면에 보여줄 데이터로 세팅 (조회수가 즉시 반영됨)
    notice.value = foundNotice
  } else {
    notice.value.title = '존재하지 않는 게시글입니다.'
  }
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
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  border-bottom: 1px solid #333;
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
</style>
