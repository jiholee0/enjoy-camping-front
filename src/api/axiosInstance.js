// src/api/axiosInstance.js
import axios from 'axios';

// 공통 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://localhost', // 공통으로 사용할 baseURL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;
