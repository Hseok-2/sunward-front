<template>
  <footer class="footer">
    <div class="container">
      <span class="footer-logo">SUNWARD</span>
      <div class="footer-info">
        <p>대표자 : 윤혜진 | 사업자등록번호 : 402-88-01787</p>
        <p>
          경기도 성남시 수정구 달래내로 388, 2층(창곡동) | 전화 : 031-759-4370 | 팩스 : 031-759-4384
        </p>
      </div>
      <p class="copyright">© 2026 SUNWARD. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
/* 푸터 */
.footer {
  background: #222;
  padding: 60px 0;
  color: #888;
  font-size: 14px;
}
.footer-logo {
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 24px;
  display: block;
}
.footer-info p {
  margin-bottom: 8px;
  line-height: 1.6;
}
.copyright {
  margin-top: 30px;

  font-size: 13px;
  opacity: 0.6;
}

/* [모바일 반응형 - 768px 이하] */
@media (max-width: 768px) {
  .footer {
    padding: 40px 0;
    text-align: center;
  }

  .footer-logo {
    margin-bottom: 15px;
  }

  .footer-info p {
    font-size: 12px;
    word-break: keep-all; /* 단어 단위 줄바꿈으로 가독성 향상 */
  }
}
</style>
