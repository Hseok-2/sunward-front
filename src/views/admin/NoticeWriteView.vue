<template>
  <div class="notice-write-container">
    <div class="page-header">
      <h1 class="page-title">📢 공지사항 작성</h1>
      <p class="page-desc">새로운 공지사항을 등록합니다.</p>
    </div>

    <div class="write-box card">
      <form @submit.prevent="handleSubmit" class="write-form">
        <div class="input-group">
          <label for="title">제목</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="공지사항 제목을 입력하세요."
            required
            class="input-field"
          />
        </div>

        <div class="input-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.pinned" />
            <span class="custom-checkbox"></span>
            <span class="checkbox-text">상단 고정 공지로 설정 (리스트 최상단에 노출됩니다)</span>
          </label>
        </div>

        <div class="input-group">
          <label for="content">내용</label>
          <textarea
            id="content"
            v-model="form.content"
            placeholder="내용을 상세히 입력해 주세요."
            required
            class="input-field textarea-field"
          ></textarea>
        </div>

        <div class="button-area">
          <button type="button" class="btn btn-secondary" @click="$router.back()">취소</button>
          <button type="submit" class="btn btn-primary">등록하기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index'

const router = useRouter()

const form = reactive({
  title: '',
  content: '',
  pinned: false,
})

const handleSubmit = async () => {
  // 1. 토큰 가져오기 (axios 인터셉터에서 처리되지만, 명시적 확인용)
  const token = localStorage.getItem('accessToken')

  if (!token) {
    alert('로그인이 필요한 서비스입니다.')
    router.push('/admin/login')
    return
  }

  try {
    // 2. 백엔드 API 호출
    // 토큰은 axios 인스턴스(api)에 인터셉터로 설정되어 있다면 헤더 설정을 생략해도 됩니다.
    // 만약 설정 안 되어 있다면 기존 코드처럼 headers를 추가하세요.
    await api.post('/api/notices', form)

    alert('공지사항이 성공적으로 등록되었습니다.')
    // 3. 등록 후 관리자용 공지사항 목록으로 이동 (아직 안 만들었으면 임시로 대시보드로 이동)
    router.push('/admin/notice')
  } catch (error) {
    console.error('등록 실패:', error)
    const message = error.response?.data?.message || '공지사항 등록에 실패했습니다.'
    alert(message)
  }
}
</script>

<style scoped>
/* =========================================
   관리자 레이아웃에 맞춘 공통 스타일 적용
   ========================================= */
.notice-write-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 5px;
}

.page-desc {
  color: #666;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  padding: 30px;
}

.write-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.input-field {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #4f81e9;
}

.textarea-field {
  height: 300px;
  resize: vertical; /* 세로 크기 조절 허용 */
}

/* 체크박스 스타일 */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-text {
  font-size: 14px;
  color: #e74c3c; /* 빨간색으로 강조 */
  font-weight: 500;
}

/* 버튼 영역 */
.button-area {
  display: flex;
  gap: 10px;
  justify-content: flex-end; /* 우측 정렬 */
  margin-top: 10px;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #555;
}
.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-primary {
  background-color: #4f81e9;
  color: #fff;
}
.btn-primary:hover {
  background-color: #3e70d8;
}

/* =========================================
   태블릿 및 모바일 반응형 설정 (768px 이하)
   ========================================= */
@media (max-width: 768px) {
  .notice-write-container {
    padding: 15px;
  }

  .card {
    padding: 20px;
  }

  .page-title {
    font-size: 20px;
  }

  .button-area {
    flex-direction: column; /* 모바일에서는 버튼을 세로로 꽉 차게 배치 */
  }

  .btn {
    width: 100%;
  }
}
</style>
