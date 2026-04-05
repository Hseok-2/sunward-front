<template>
  <div class="admin-login-container">
    <div class="login-box">
      <div class="login-header">
        <div class="icon-wrapper">
          <span class="lock-icon">🔒</span>
        </div>
        <h1 class="title">ADMIN LOGIN</h1>
        <p class="subtitle">관리자 로그인</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="아이디"
            class="input-field"
            required
          />
        </div>

        <div class="input-group">
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="비밀번호"
            class="input-field"
            required
          />
        </div>

        <button type="submit" class="login-button">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index' // 작성해둔 axios 인스턴스 가져오기

const router = useRouter()

// 로그인 입력 폼 데이터 (기존 로직 유지)
const loginForm = ref({
  username: '',
  password: '',
})

// 로그인 버튼 클릭 시 실행될 함수 (기존 로직 유지)
const handleLogin = async () => {
  try {
    // 1. 백엔드로 로그인 API 호출
    const response = await api.post('/api/admin/login', loginForm.value)

    // 2. 응답받은 토큰 추출 (백엔드 DTO에 맞게 .accessToken으로 꺼냄)
    const token = response.data.accessToken

    // 3. 브라우저 저장소(localStorage)에 출입증 보관
    localStorage.setItem('accessToken', token)

    alert('관리자 로그인 성공!')

    // 4. 로그인 성공 후 메인 페이지 또는 대시보드로 이동
    router.push('/admin/dashboard')
  } catch (error) {
    console.error(error)
    // 우리가 만든 GlobalExceptionHandler의 에러 메시지를 활용
    const errorMessage = error.response?.data?.message || '로그인에 실패했습니다.'
    alert(errorMessage)
  }
}
</script>

<style scoped>
/* 전체 화면 컨테이너 (정중앙 배치) */
.admin-login-container {
  height: 100vh;
  background-color: #f7f9fc; /* 이미지의 아주 옅은 그레이 배경색 적용 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 로그인 박스 (흰색 카드) */
.login-box {
  background-color: #ffffff;
  padding: 50px;
  border: 1px solid #eee; /* 이미지의 옅은 테두리 적용 */
  width: 100%;
  max-width: 400px; /* 박스 너비 제한 */
  text-align: center;
}

/* 헤더 영역 디자인 */
.login-header {
  margin-bottom: 30px;
}

.icon-wrapper {
  margin-bottom: 15px;
}

.lock-icon {
  font-size: 50px; /* 자물쇠 크기 확대 */
  color: #4f81e9; /* 이미지의 파란색 자물쇠 색상 적용 */
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase; /* 대문자로 고정 */
  color: #333;
  margin: 0 0 5px 0;
}

.subtitle {
  font-size: 14px;
  color: #888;
  margin: 0;
}

/* 폼 영역 디자인 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 입력창 간격 */
}

.input-group {
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 12px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #ddd; /* 하단 테두리 */
  outline: none; /* 클릭 시 기본 파란색 테두리 제거 */
  font-size: 14px;
  color: #333;
}

/* 입력창 클릭(focus) 시 하단 테두리 색상 변경 */
.input-field:focus {
  border-bottom: 2px solid #4f81e9; /* 🟡 [수정] 이미지 파란색으로 테두리 강조 */
}

/* 입력창 placeholder 색상 설정 */
.input-field::placeholder {
  color: #ccc;
}

.login-button {
  width: 100%;
  padding: 15px;
  background-color: #4f81e9;
  color: #ffffff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #3e70d8; /* 호버 시 약간 어두워지는 파란색 */
}

/* =========================================
   모바일 반응형 설정 (화면 너비 480px 이하)
   ========================================= */
@media (max-width: 480px) {
  .admin-login-container {
    padding: 15px;
  }

  .login-box {
    padding: 40px 20px;
  }

  .lock-icon {
    font-size: 40px;
  } /* 💡 여기 닫는 괄호가 빠져있었습니다! */

  .title {
    font-size: 22px;
  }

  .input-field {
    font-size: 13px; /* 모바일 키보드가 올라올 때 대비 */
    padding: 10px;
  }

  .login-button {
    padding: 12px;
    font-size: 15px;
  }
}
</style>
