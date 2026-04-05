<template>
  <div class="category-container">
    <h1 class="page-title">📁 카테고리 관리</h1>
    <p class="page-desc">쇼핑몰의 제품 분류 기준을 관리합니다.</p>

    <div class="add-section card">
      <form @submit.prevent="addCategory" class="add-form">
        <input
          v-model="newCategoryName"
          type="text"
          placeholder="새 카테고리 이름 입력"
          class="input-field"
          required
        />
        <button type="submit" class="btn btn-primary">추가하기</button>
      </form>
    </div>

    <div class="list-section card">
      <ul class="category-list" v-if="categories.length > 0">
        <li v-for="category in categories" :key="category.id" class="category-item">
          <template v-if="editingId === category.id">
            <input
              v-model="editCategoryName"
              type="text"
              class="input-field edit-input"
              @keyup.enter="saveEdit(category.id)"
            />
            <div class="action-buttons">
              <button @click="saveEdit(category.id)" class="btn btn-success">저장</button>
              <button @click="cancelEdit" class="btn btn-secondary">취소</button>
            </div>
          </template>

          <template v-else>
            <span class="category-name">{{ category.name }}</span>
            <div class="action-buttons">
              <button @click="startEdit(category)" class="btn btn-outline">수정</button>
              <button @click="deleteCategory(category.id)" class="btn btn-danger">삭제</button>
            </div>
          </template>
        </li>
      </ul>

      <div v-else class="empty-state">등록된 카테고리가 없습니다.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/index' // Axios 인스턴스 가져오기

// 상태 관리 변수들
const categories = ref([])
const newCategoryName = ref('')
const editingId = ref(null)
const editCategoryName = ref('')

// [1] 카테고리 목록 불러오기 (Read)
const fetchCategories = async () => {
  try {
    // 💡 백엔드의 실제 API 경로에 맞춰서 수정해주세요. (예: /api/categories)
    const response = await api.get('/api/admin/categories')
    categories.value = response.data
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error)
    // 개발 중 화면 테스트를 위한 임시 더미 데이터 (나중에 지워주세요)
    categories.value = [
      { id: 1, name: '플로어링 장판' },
      { id: 2, name: '고급 데코타일' },
    ]
  }
}

// [2] 카테고리 추가하기 (Create)
const addCategory = async () => {
  if (!newCategoryName.value.trim()) return

  try {
    await api.post('/api/admin/categories', { name: newCategoryName.value })
    alert('카테고리가 추가되었습니다.')
    newCategoryName.value = '' // 입력창 초기화
    fetchCategories() // 목록 새로고침
  } catch (error) {
    console.error(error)
    const msg = error.response?.data?.message || '카테고리 추가에 실패했습니다.'
    alert(msg)
  }
}

// [3] 수정 모드 진입 및 취소 로직
const startEdit = (category) => {
  editingId.value = category.id
  editCategoryName.value = category.name
}

const cancelEdit = () => {
  editingId.value = null
  editCategoryName.value = ''
}

// [4] 카테고리 수정 저장하기 (Update)
const saveEdit = async (id) => {
  if (!editCategoryName.value.trim()) return

  try {
    await api.put(`/api/admin/categories/${id}`, { name: editCategoryName.value })
    alert('수정되었습니다.')
    cancelEdit() // 수정 모드 종료
    fetchCategories() // 목록 새로고침
  } catch (error) {
    console.error(error)
    alert('수정에 실패했습니다.')
  }
}

// [5] 카테고리 삭제하기 (Delete)
const deleteCategory = async (id) => {
  if (!confirm('정말 삭제하시겠습니까? 관련된 제품이 있다면 문제가 발생할 수 있습니다.')) return

  try {
    await api.delete(`/api/admin/categories/${id}`)
    alert('삭제되었습니다.')
    fetchCategories() // 목록 새로고침
  } catch (error) {
    console.error(error)
    alert('삭제에 실패했습니다.')
  }
}

// 컴포넌트가 화면에 나타날 때 목록을 바로 불러옵니다.
onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.category-container {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 5px;
}

.page-desc {
  color: #666;
  margin-bottom: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 20px;
}

/* 입력 필드 공통 스타일 */
.input-field {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #4f81e9;
}

/* 버튼 공통 스타일 */
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

.btn-success {
  background-color: #2ecc71;
  color: white;
}
.btn-success:hover {
  background-color: #27ae60;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}
.btn-secondary:hover {
  background-color: #7f8c8d;
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

/* 폼 영역 */
.add-form {
  display: flex;
  gap: 10px;
}

.add-form .input-field {
  flex: 1; /* 인풋 창이 남는 공간을 모두 차지하도록 */
}

/* 리스트 영역 */
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.category-item:last-child {
  border-bottom: none;
}

.category-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.edit-input {
  flex: 1;
  margin-right: 15px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #999;
}

/* =========================================
   태블릿 및 모바일 반응형 설정 (768px 이하)
   ========================================= */
@media (max-width: 768px) {
  .category-container {
    padding: 15px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-desc {
    font-size: 13px;
    margin-bottom: 15px;
  }

  .card {
    padding: 15px;
  }

  /* 카테고리 추가 폼을 모바일에서는 세로로 배치 */
  .add-form {
    flex-direction: column;
  }

  .add-form .btn {
    width: 100%; /* 버튼이 꽉 차게 */
  }

  /* 카테고리 리스트 아이템 디자인 조정 */
  .category-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .edit-input {
    width: 100%; /* 수정 인풋창 꽉 차게 */
    margin-right: 0;
  }

  /* 액션 버튼들을 우측 정렬 */
  .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
