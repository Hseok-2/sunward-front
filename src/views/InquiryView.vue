<template>
  <div class="inquiry-view">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Request a Quote</h1>
        <p class="hero-subtitle">견적 문의</p>
      </div>
    </section>

    <section class="form-section">
      <div class="container">
        <form @submit.prevent="submitInquiry" class="inquiry-form">
          <div class="form-table">
            <div class="form-row">
              <div class="form-label">이름 <span class="required">*</span></div>
              <div class="form-field">
                <input type="text" v-model="form.name" class="input-text w-200" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-label">연락처 <span class="required">*</span></div>
              <div class="form-field phone-field">
                <select v-model="form.phone1" class="input-select">
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="02">02</option>
                  <option value="031">031</option>
                </select>
                <span class="dash">-</span>
                <input
                  type="text"
                  v-model="form.phone2"
                  class="input-text w-100"
                  maxlength="4"
                  required
                />
                <span class="dash">-</span>
                <input
                  type="text"
                  v-model="form.phone3"
                  class="input-text w-100"
                  maxlength="4"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-label">이메일 <span class="required">*</span></div>
              <div class="form-field email-field">
                <input type="text" v-model="form.emailId" class="input-text w-150" required />
                <span class="at">@</span>
                <input type="text" v-model="form.emailDomain" class="input-text w-150" required />
                <select v-model="form.emailDomain" class="input-select">
                  <option value="">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="nate.com">nate.com</option>
                  <option value="daum.net">daum.net</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-label">제목</div>
              <div class="form-field">
                <input type="text" v-model="form.title" class="input-text w-full-max" />
              </div>
            </div>

            <div class="form-row content-row">
              <div class="form-label">내용 <span class="required">*</span></div>
              <div class="form-field">
                <textarea v-model="form.content" class="input-textarea" required></textarea>
              </div>
            </div>

            <div class="form-row captcha-row">
              <div class="form-label">자동방지문 <span class="required">*</span></div>
              <div class="form-field captcha-field">
                <div class="captcha-img">{{ captchaText }}</div>
                <div class="captcha-input-wrap">
                  <input
                    type="text"
                    v-model="form.captchaInput"
                    class="input-text w-200"
                    placeholder="글자를 입력하세요."
                    required
                  />
                  <button type="button" class="btn-refresh" @click="refreshCaptcha">
                    새로고침
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="privacy-section">
            <h3 class="privacy-title">개인정보 수집·이용에 대한 동의</h3>
            <div class="privacy-box">
              <p>■ 수집하는 개인정보 항목</p>
              <p>회사는 견적 문의를 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
              <p>◇ 수집항목 : 이름, 연락처, 이메일, 제목, 내용</p>
              <br />
              <p>■ 개인정보의 수집 및 이용목적</p>
              <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
              <p>- 견적 문의에 대한 원활한 상담 및 답변 제공</p>
            </div>
            <div class="privacy-agree">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.agree" required />
                <span class="agree-text">위와 같이 개인정보를 수집·이용하는데 동의합니다.</span>
              </label>
            </div>
          </div>

          <div class="submit-area">
            <button type="submit" class="btn-submit">문의 접수하기</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const generateCaptcha = () => {
  return Math.random().toString(36).substring(2, 8)
}

const captchaText = ref(generateCaptcha())

const refreshCaptcha = () => {
  captchaText.value = generateCaptcha()
}

const form = reactive({
  name: '',
  phone1: '010',
  phone2: '',
  phone3: '',
  emailId: '',
  emailDomain: '',
  title: '',
  content: '',
  captchaInput: '',
  agree: false,
})

const submitInquiry = () => {
  if (!form.agree) {
    alert('개인정보 수집 및 이용에 동의해주세요.')
    return
  }

  if (form.captchaInput !== captchaText.value) {
    alert('자동방지문자가 일치하지 않습니다. 다시 확인해주세요.')
    form.captchaInput = ''
    return
  }

  // 🚩 [추후 백엔드 작업] 7번 요구사항: 관리자 이메일 발송 API 연동 시 이 부분에 axios 코드가 들어갑니다.
  console.log('제출된 폼 데이터:', form)
  alert('견적 문의가 정상적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.')

  Object.keys(form).forEach((key) => (form[key] = ''))
  form.agree = false
  refreshCaptcha()
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 히어로 배너 */
.hero-section {
  height: 350px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('/images/support-bg.png') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* 탭 메뉴가 사라졌으므로 패딩을 줄여서 타이틀을 중앙으로 맞춤 */
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

/* 문의 폼 영역 */
.form-section {
  padding: 80px 0 120px;
}

.form-table {
  border-top: 2px solid #333;
  border-bottom: 1px solid #ddd;
}

.form-row {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.form-label {
  width: 180px;
  background-color: #fcfcfc;
  padding: 20px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.required {
  color: #e74c3c;
  margin-left: 5px;
}

.form-field {
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
}

.input-text,
.input-select {
  border: 1px solid #ccc;
  padding: 10px 12px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.input-text:focus,
.input-select:focus {
  border-color: #333;
}

.input-textarea {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  padding: 15px;
  font-size: 15px;
  resize: none;
  outline: none;
}
.input-textarea:focus {
  border-color: #333;
}

.w-100 {
  width: 100px;
}
.w-150 {
  width: 150px;
}
.w-200 {
  width: 200px;
}
.w-full-max {
  width: 100%;
  max-width: 600px;
}

.dash,
.at {
  margin: 0 10px;
  color: #666;
}

.phone-field,
.email-field {
  display: flex;
  align-items: center;
}

.captcha-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.captcha-img {
  background-color: #2c3e50;
  color: #fff;
  padding: 10px 20px;
  font-family: monospace;
  font-size: 20px;
  letter-spacing: 3px;
}

.captcha-input-wrap {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-refresh {
  background-color: #fff;
  border: 1px solid #35a852;
  color: #35a852;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}

.privacy-section {
  margin-top: 60px;
  border: 1px solid #eaeaea;
  padding: 30px;
  background-color: #fafafa;
}

.privacy-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
}

.privacy-box {
  background-color: #fff;
  border: 1px solid #ddd;
  height: 150px;
  overflow-y: auto;
  padding: 20px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.privacy-agree {
  text-align: center;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
}

.agree-text {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.submit-area {
  margin-top: 50px;
  text-align: center;
}

.btn-submit {
  background-color: #35a852;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  padding: 15px 60px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit:hover {
  opacity: 0.8;
}
/* =========================================
   📱 모바일 반응형 설정 (PC 좌우 배치 구조 유지 버전)
   ========================================= */
@media (max-width: 768px) {
  .form-section {
    padding: 40px 0 60px;
  }

  /* 1. 세로로 꺾지 않고 가로 배치(row) 강제 유지 */
  .form-row {
    flex-direction: row;
  }

  /* 2. 좁은 화면을 위해 왼쪽 라벨(이름, 연락처 등) 너비와 여백을 대폭 축소 */
  .form-label {
    width: 85px; /* 기존 180px에서 모바일에 맞게 축소 */
    padding: 15px 10px;
    font-size: 13px; /* 글자 크기 축소 */
  }

  /* 3. 오른쪽 입력 영역 여백 축소 */
  .form-field {
    padding: 15px 10px;
  }

  /* 4. 고정 너비(px) 클래스들을 유연하게 100%로 변경 */
  .w-100,
  .w-150,
  .w-200,
  .w-full-max {
    width: 100%;
  }

  /* 5. 연락처 및 이메일 영역 가로 배치(nowrap) 강제 유지 */
  .phone-field,
  .email-field {
    flex-wrap: nowrap; /* 절대 밑으로 떨어지지 않게 고정 */
    gap: 3px; /* 입력창 사이 간격 최소화 */
  }

  .phone-field .input-select,
  .phone-field .input-text,
  .email-field .input-select,
  .email-field .input-text {
    padding: 8px 5px;
    font-size: 12px; /* 좁은 공간에 글자가 다 들어가도록 폰트 크기 축소 */
    flex: 1; /* 남은 공간을 균등하게 나눠 가짐 */
  }

  /* 6. 하이픈(-)과 골뱅이(@) 기호 간격 축소 */
  .dash,
  .at {
    margin: 0 2px;
    font-size: 13px;
  }

  /* 7. 자동방지문자 영역 (이미지 아래에 가로로 입력창+버튼 배치) */
  .captcha-field {
    align-items: stretch;
  }
  .captcha-input-wrap {
    display: flex;
    flex-direction: row; /* 입력창과 버튼 가로 유지 */
    gap: 5px;
    width: 100%;
  }
  .captcha-input-wrap .input-text {
    flex: 1;
    width: auto;
  }
  .btn-refresh {
    padding: 8px 10px;
    font-size: 12px;
    white-space: nowrap; /* 버튼 글씨 안 깨지게 고정 */
  }

  /* 8. 제출 버튼 꽉 차게 */
  .btn-submit {
    width: 100%;
    padding: 15px 0;
  }
}
</style>
