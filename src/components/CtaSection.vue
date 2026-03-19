<template>
  <section class="cta">
    <h2>찾으시는 자재가 있으신가요?</h2>
    <p>온라인으로 간편하게 견적을 문의하세요.</p>
    <RouterLink to="/inquiry" class="btn-orange">견적 문의하기</RouterLink>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToInquiry = () => {
  router.push('/inquiry')
}
</script>

<style scoped>
/* 문의 유도 (CTA) */
.cta {
  background: #1a2b4c;
  padding: 70px 0;
  text-align: center;
  color: #fff;
}
.cta h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}
.cta p {
  font-size: 18px;
  opacity: 0.8;
  margin-bottom: 40px;
}
.btn-orange {
  background: #f2994a;
  color: #fff;
  border: none;
  padding: 16px 48px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
}
.btn-orange:hover {
  background: #e08e43;
  transform: translateY(-2px);
}

/* 모바일 반응형 디자인 (768px 이하) */
.cta h2 {
  font-size: 24px;
}
.btn-orange {
  padding: 14px 32px;
  font-size: 16px;
}
</style>
