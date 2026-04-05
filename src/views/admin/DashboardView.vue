<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">📊 관리자 대시보드</h1>
    <p class="dashboard-desc">쇼핑몰의 현황을 한눈에 파악할 수 있는 공간입니다.</p>

    <div class="status-cards">
      <div class="card">등록된 글: 0건</div>
      <div class="card">문의 사항: 0건</div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.dashboard-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.dashboard-desc {
  color: #666;
  margin-bottom: 20px;
}

.status-cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 그림자를 조금 더 부드럽게 조정 */
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #2c3e50;
  border: 1px solid #eee;
}

/* =========================================
   태블릿 및 모바일 반응형 설정 (768px 이하)
   ========================================= */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 15px; /* 모바일 화면에 맞게 전체 여백 축소 */
  }

  .dashboard-title {
    font-size: 20px; /* 제목 크기 축소 */
  }

  .dashboard-desc {
    font-size: 14px; /* 설명 글귀 크기 축소 */
  }

  .status-cards {
    flex-direction: column; /* 카드를 가로 배열에서 세로 배열로 변경 */
    gap: 15px; /* 카드 사이 간격 축소 */
  }

  .card {
    padding: 20px; /* 카드 내부 여백 축소 */
    font-size: 16px; /* 텍스트 크기 축소 */
  }
}
</style>
