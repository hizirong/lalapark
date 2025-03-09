import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // 若需要處理 session cookie
});
// 獲取附近公園
export const fetchParks = (lat, lng, radius = 5) => 
  API.get('/parks', { params: { lat, lng, radius } });

// 獲取天氣
export const fetchWeather = (lat, lng) => 
  API.get('/weather', { params: { lat, lng } });

// 獲取最近訪問的公園
export const fetchRecentParks = () => 
  API.get('/users/recentParks');

// 強化推薦公園API
export const fetchRecommendedParks = (purpose, lat, lng, facilities = []) => 
  API.get('/parks/recommend', { 
    params: { 
      purpose, 
      lat, 
      lng, 
      facilities: facilities.join(',') 
    } 
  });