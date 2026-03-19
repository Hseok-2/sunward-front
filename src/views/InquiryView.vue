<template>
  <div class="inquiry-view">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Online Inquiry</h1>
        <p class="hero-subtitle">온라인문의</p>
      </div>
    </section>

    <div class="tab-menu-wrapper">
      <div class="tab-menu">
        <RouterLink to="/support" class="tab-item">공지사항</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/inquiry" class="tab-item active">문의하기</RouterLink>
      </div>
    </div>

    <section class="form-section" style="padding-top: 60px">
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
                    placeholder="왼쪽의 글자를 입력하세요."
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
              <p>회사는 온라인문의를 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
              <p>◇ 수집항목 : 이름, 연락처, 이메일, 제목, 내용</p>
              <br />
              <p>■ 개인정보의 수집 및 이용목적</p>
              <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
              <p>- 온라인 문의에 대한 원활한 상담 및 답변 제공</p>
            </div>
            <div class="privacy-agree">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.agree" required />
                <span class="agree-text">위와 같이 개인정보를 수집·이용하는데 동의합니다.</span>
              </label>
            </div>
          </div>

          <div class="submit-area">
            <button type="submit" class="btn-submit">확인</button>
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

  // 모든 검사를 통과했을 때 실제 제출 로직
  console.log('제출된 폼 데이터:', form)
  alert('문의가 정상적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.')

  // 성공 후 폼 초기화 및 캡차 새로고침
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
  padding-top: 80px;
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

/* 플로팅 탭 메뉴*/
.tab-menu-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -35px; /* 배너 위로 반쯤 걸치게 끌어올림 */
  position: relative;
  z-index: 10;
}

.tab-menu {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 50px;
  height: 70px;
  border-radius: 35px; /* 둥근 캡슐 모양 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* 부드러운 그림자 */
}

.tab-item {
  color: #555;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 30px;
  position: relative;
  transition: color 0.3s;
}

.divider {
  color: #ddd;
  font-size: 14px;
}

/* 활성화된 탭 스타일 (초록색) */
.tab-item.active,
.tab-item.router-link-exact-active {
  color: #2ea043; /* 제출 버튼과 통일된 초록색 */
}

.tab-item.active::after,
.tab-item.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -15px; /* 탭 메뉴 박스 아래로 삐져나오는 삼각형 */
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #2ea043 transparent transparent transparent;
}

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
</style>
