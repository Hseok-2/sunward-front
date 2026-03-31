import { ref } from 'vue'

// 1. 초기 더미 데이터
const initialData = [
  {
    id: '공지',
    title: 'SUNWARD 홈페이지를 오픈하였습니다.',
    date: '26-03-20',
    views: 230,
    isNotice: true,
    content: 'SUNWARD 홈페이지가 새롭게 단장하여 오픈했습니다. 많은 이용 부탁드립니다.',
  },
  {
    id: '3',
    title: 'SUNWARD 하계 휴무 일정 안내',
    date: '26-03-15',
    views: 214,
    isNotice: false,
    content: '하계 휴무 일정 안내드립니다. 업무에 참고하시기 바랍니다.',
  },
  {
    id: '2',
    title: '신제품 (프리미엄 데코타일) 출시 안내',
    date: '26-03-10',
    views: 209,
    isNotice: false,
    content: '프리미엄 데코타일 신제품이 출시되었습니다. 카탈로그를 확인해 주세요.',
  },
  {
    id: '1',
    title: 'SUNWARD 고객지원 센터 운영시간 안내',
    date: '26-03-01',
    views: 206,
    isNotice: false,
    content: '고객지원 센터 운영시간은 평일 09:00 ~ 18:00 입니다.',
  },
]

// 2. 로컬 스토리지에서 데이터를 불러오거나, 없으면 초기 데이터를 사용
const getStoredNotices = () => {
  const stored = localStorage.getItem('sunward_notices')
  if (stored) {
    return JSON.parse(stored)
  }
  return initialData
}

// 3. 전역 상태로 사용할 반응형 변수
export const globalNotices = ref(getStoredNotices())

// 4. 조회수 증가 함수 (로컬 스토리지에도 저장하여 새로고침해도 유지됨)
export const increaseViewCount = (id) => {
  const notice = globalNotices.value.find((n) => n.id === id)
  if (notice) {
    notice.views += 1
    // 데이터가 변경될 때마다 로컬 스토리지 업데이트
    localStorage.setItem('sunward_notices', JSON.stringify(globalNotices.value))
  }
}
