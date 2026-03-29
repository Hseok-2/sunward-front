<template>
  <section class="hero">
    <h1>병원 자재 전문 회사, SUNWARD</h1>
    <p>최고의 품질, 합리적인 가격으로 귀하의 현장을 지원합니다.</p>
  </section>
</template>

<style scoped>
/* 히어로 섹션 */
.hero {
  height: 800px;
  /* 배경 이미지 연결 */
  background:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/new-hero-bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}
.hero h1 {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.hero p {
  font-size: 20px;
  font-weight: 400;
  opacity: 0.9;
}

/* [2. 모바일 반응형 디자인 - 768px 이하] */
@media (max-width: 768px) {
  .hero {
    height: 600px; /* 모바일에서는 높이를 줄여 한눈에 들어오게 합니다. */
  }

  .hero h1 {
    font-size: 32px;
    word-break: keep-all; /* 단어가 잘리지 않고 줄바꿈되게 하여 가독성을 높입니다. */
    padding: 0 20px; /* 양옆 여백 추가 */
  }

  .hero p {
    font-size: 16px;
    padding: 0 20px;
  }
}
</style>
