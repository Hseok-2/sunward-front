document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid");
  const prevBtn = document.querySelector(
    '.product-wrapper .arrow-icon[alt="이전"]',
  );
  const nextBtn = document.querySelector(
    '.product-wrapper .arrow-icon[alt="다음"]',
  );

  // 카드 너비(280px) + 간격(24px) = 304px
  const scrollAmount = 304;

  // [이전] 버튼 클릭 이벤트
  prevBtn.addEventListener("click", () => {
    // 현재 스크롤 위치가 0(맨 처음)에 가까우면 -> 맨 끝으로 이동
    if (productGrid.scrollLeft <= 10) {
      // 전체 스크롤 길이에서 화면 너비를 뺀 만큼 이동 (맨 끝 위치)
      productGrid.scrollTo({
        left: productGrid.scrollWidth - productGrid.clientWidth,
        behavior: "smooth",
      });
    } else {
      // 아니면 왼쪽으로 한 칸 이동
      productGrid.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  });

  // [다음] 버튼 클릭 이벤트
  nextBtn.addEventListener("click", () => {
    // 최대 스크롤 가능 범위 계산
    const maxScrollLeft = productGrid.scrollWidth - productGrid.clientWidth;

    // 현재 위치가 끝에 가까우면 (오차범위 10px) -> 맨 처음으로 이동
    if (productGrid.scrollLeft >= maxScrollLeft - 10) {
      productGrid.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      // 아니면 오른쪽으로 한 칸 이동
      productGrid.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  });
});
