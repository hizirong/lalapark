// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // 若需要處理 session cookie
});

// 取得所有公園
export const fetchParks = () => API.get('/parks');

// 推薦公園
export const fetchRecommendedParks = (purpose, lat, lng) => 
  API.get('/parks/recommend', { params: { purpose, lat, lng } });

// Google OAuth 登入連結（前端也可以直接導到後端）
export const googleLoginURL = `${process.env.REACT_APP_API_BASE_URL.replace('/api','')}/users/google`;
