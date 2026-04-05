<template>
  <div class="notice-edit-container">
    <div class="page-header">
      <h1 class="page-title">📝 공지사항 수정</h1>
    </div>

    <div class="write-box card">
      <form @submit.prevent="handleUpdate" class="write-form">
        <div class="input-group">
          <label for="title">제목</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="제목을 입력하세요."
            required
            class="input-field"
          />
        </div>

        <div class="input-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.pinned" />
            <span class="custom-checkbox"></span>
            <span class="checkbox-text">상단 고정 공지로 설정</span>
          </label>
        </div>

        <div class="input-group">
          <label for="content">내용</label>
          <textarea
            id="content"
            v-model="form.content"
            placeholder="내용을 입력하세요."
            required
            class="input-field textarea-field"
          ></textarea>
        </div>

        <div class="button-area">
          <button type="button" class="btn btn-secondary" @click="$router.back()">취소</button>
          <button type="submit" class="btn btn-primary">수정완료</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api/index'

const router = useRouter()
const route = useRoute() // 현재 URL의 파라미터(ID)를 가져오기 위해 필요

const form = reactive({
  title: '',
  content: '',
  pinned: false,
})

// 1. 기존 데이터 불러오기 (Read Detail)
const fetchNoticeDetail = async () => {
  const noticeId = route.params.id // URL에서 ID 추출
  try {
    const response = await api.get(`/api/notices/${noticeId}`)
    const data = response.data
    form.title = data.title
    form.content = data.content
    form.pinned = data.pinned // 백엔드 수정 후라 정상적으로 반영됨
  } catch (error) {
    console.error('데이터 로드 실패:', error)
    alert('공지사항을 불러올 수 없습니다.')
    router.push('/admin/notice')
  }
}

// 2. 수정 요청 보내기 (Update)
const handleUpdate = async () => {
  const noticeId = route.params.id
  try {
    await api.put(`/api/notices/${noticeId}`, form)
    alert('성공적으로 수정되었습니다.')
    router.push('/admin/notice') // 수정 후 목록으로 이동
  } catch (error) {
    console.error('수정 실패:', error)
    alert('수정에 실패했습니다.')
  }
}

onMounted(() => {
  fetchNoticeDetail()
})
</script>

<style scoped>
/* NoticeWriteView.vue 와 동일한 스타일 유지 (반응형 포함) */
.notice-edit-container {
  padding: 20px;
}
.page-title {
  font-size: 24px;
  color: #333;
}
.card {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  border: 1px solid #eee;
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
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.textarea-field {
  height: 300px;
  resize: vertical;
}

/* 체크박스 스타일 */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-text {
  color: #e74c3c;
  font-size: 14px;
  font-weight: 500;
}
.button-area {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.btn {
  padding: 12px 25px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  border: none;
}
.btn-primary {
  background: #4f81e9;
  color: #fff;
}
.btn-secondary {
  background: #f1f1f1;
  color: #555;
}

@media (max-width: 768px) {
  .button-area {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
}
</style>
