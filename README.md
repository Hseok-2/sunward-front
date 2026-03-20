# 🏗️ SUNWARD (프론트엔드)

SUNWARD(건축 자재 B2B 플랫폼) 웹사이트의 프론트엔드 리포지토리입니다. 
Vite와 Vue 3 기반으로 빠르고 가볍게 구축되었으며, 모바일과 PC를 모두 지원하는 반응형 웹으로 제작되었습니다.

## 🛠 기술 스택 (Tech Stack)
- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Routing:** Vue Router
- **Styling:** CSS3 (모바일 반응형 대응)

## ✨ 주요 기능 (Key Features)
- **모바일 반응형 헤더:** 해상도에 따른 햄버거 메뉴 및 아코디언 LNB 지원
- **동적 제품 슬라이더:** 제품 카테고리를 한눈에 볼 수 있는 무한 캐러셀 슬라이더
- **제품 검색 및 페이징:** 카테고리별 제품 리스트 조회, 키워드 검색 및 Pagination
- **컴포넌트 모듈화:** 플로팅 탭 메뉴 등 공통 UI를 컴포넌트로 분리하여 유지보수성 향상

---

## 🚀 프로젝트 실행 방법 (Project Setup)

프로젝트를 로컬 환경에서 실행하기 위해 아래의 명령어들을 순서대로 입력해 주세요.

### 1. 패키지 설치 (Install Dependencies)
```sh
npm install

2. 개발 서버 실행 (Compile and Hot-Reload for Development)
Bash
npm run dev

💻 권장 개발 환경 (Recommended IDE Setup)
에디터: VS Code

필수 확장 프로그램: Vue (Official)
(주의: 기존에 Vetur를 사용 중이시라면 비활성화해 주세요.)

🌐 권장 브라우저 설정 (Recommended Browser Setup)
원활한 디버깅을 위해 브라우저별 확장 프로그램을 설치하는 것을 권장합니다.

Chrome / Edge / Brave: Vue.js devtools 설치 및 Custom Object Formatter 켜기

Firefox: Vue.js devtools 설치 및 Custom Object Formatter 켜기

본 프로젝트는 향후 Spring Boot 및 MySQL 기반의 백엔드 API와 연동될 예정입니다.
