<template>
  <section class="container about">
    <div class="about-content">
      <div class="about-img">
        <video autoplay muted loop playsinline @click="toggleMute($event)">
          <source src="/images/about.mp4" type="video/mp4" />
          브라우저가 동영상을 지원하지 않습니다.
        </video>
      </div>
      <div class="about-text">
        <h2>We are Sunward...</h2>
        <p>
          Sunward는 단순한 자재 공급을 넘어 현장의 완공까지 함께하는 든든한 파트너입니다. 최고의
          품질, 합리적인 가격으로 귀하의 현장을 지원합니다.
        </p>
        <button class="btn-line">자세히 보기</button>
      </div>
      <img src="/images/arrow-right.png" class="arrow-icon" alt="더보기" />
    </div>
  </section>
</template>

<script setup>
// 비디오 음소거 토글
const toggleMute = (event) => {
  const video = event.target
  video.muted = !video.muted
}
</script>

<style scoped>
.about {
  padding: 120px 0;
  display: flex;
  justify-content: center;
}
.about-content {
  display: flex;
  align-items: center;
  gap: 60px;
}
.about-img {
  width: 500px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
.about-img video {
  width: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
}
.about-text {
  width: 450px;
}
.about-text h2 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #111;
}
.about-text p {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.8;
}
.btn-line {
  padding: 12px 30px;
  border: 1px solid #333;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.btn-line:hover {
  background: #333;
  color: #fff;
}
.arrow-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}

/* 반응형 */
@media (max-width: 768px) {
  /* 회사 소개: 가로 배치를 세로 배치로 변경 */
  .about-content {
    flex-direction: column; /* 세로로 쌓기 */
    gap: 30px;
  }
  .about-img,
  .about-text {
    width: 100%;
  }
  .about-text {
    text-align: center;
  }
  .about-text p {
    font-size: 15px;
  }
  .about-content .arrow-icon {
    display: none;
  }
}
</style>
