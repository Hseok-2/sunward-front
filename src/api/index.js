import axios from 'axios'

// 기본 설정이 된 axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 주소 (나중에 서버에 올릴 땐 실제 도메인으로 변경)
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터: 서버로 데이터를 보내기 직전에 실행됨
api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에 저장된 토큰을 가져옴
    const token = localStorage.getItem('accessToken')

    // 토큰이 있다면 헤더에 'Bearer 토큰' 형태로 찰싹 붙여줌
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
