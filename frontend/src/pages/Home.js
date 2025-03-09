import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchParks, fetchRecommendedParks } from '../services/api';
import '../styles/Home.css';  // 引入 CSS 文件

const Home = () => {
  const [recentParks, setRecentParks] = useState([]);
  const [nearbyParks, setNearbyParks] = useState([]);
  const [recommendedParks, setRecommendedParks] = useState([]);
  const [weather, setWeather] = useState(null);
  
  // 篩選條件
  const [filters, setFilters] = useState({
    purpose: 'general', // 目的: 一般散步、遛狗、帶小孩、野餐...
    facilities: [] // 需要的設施: 遮蓋區、廁所、停車場...
  });
  
  // 初始加載
  useEffect(() => {
    // 獲取使用者位置
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          
          // 獲取附近公園
          fetchParks(latitude, longitude)
            .then(res => setNearbyParks(res.data))
            .catch(err => console.error('獲取附近公園失敗', err));
            
          // 獲取天氣資訊
          // fetchWeather(latitude, longitude)...
        },
        err => console.error('獲取位置失敗', err)
      );
    }
    
    // 獲取最近去過的公園 (需登入)
    // fetchRecentParks()...
    
    // 先加載預設推薦
    fetchRecommendedParks()
      .then(res => setRecommendedParks(res.data))
      .catch(err => console.error('獲取推薦公園失敗', err));
  }, []);
  
  // 更新篩選條件
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // 處理多選
      setFilters(prev => ({
        ...prev,
        facilities: checked 
          ? [...prev.facilities, value]
          : prev.facilities.filter(item => item !== value)
      }));
    } else {
      // 處理單選
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // 套用篩選條件
  const applyFilters = () => {
    // 獲取位置
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          
          // 根據篩選條件獲取推薦
          fetchRecommendedParks(filters.purpose, latitude, longitude, filters.facilities)
            .then(res => setRecommendedParks(res.data))
            .catch(err => console.error('獲取推薦公園失敗', err));
        }
      );
    }
  };
  
  return (
    <div className="home-container">
      {/* 頂部區域 */}
      <div className="hero-section">
        <h1>公園推薦系統</h1>
        <p>根據今日天氣與您的需求，找到最適合您的公園</p>
        
        {/* 天氣資訊 */}
        {weather && (
          <div className="weather-info">
            <p>今日天氣: {weather.description}</p>
            <p>溫度: {weather.temperature}°C</p>
          </div>
        )}
      </div>
      
      {/* 主要內容區 */}
      <div className="content-section">
        {/* 篩選區 */}
        <div className="filter-card">
          <h3>篩選條件</h3>
          <div className="filter-form">
            <div className="filter-group">
              <label>目的:</label>
              <select 
                name="purpose" 
                value={filters.purpose}
                onChange={handleFilterChange}
              >
                <option value="general">一般散步</option>
                <option value="dog_walking">遛狗</option>
                <option value="kids_friendly">帶小孩</option>
                <option value="picnic">野餐</option>
                <option value="exercise">運動</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>設施需求:</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    value="covered"
                    onChange={handleFilterChange}
                    checked={filters.facilities.includes('covered')}
                  />
                  有遮蔽區
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    value="restroom"
                    onChange={handleFilterChange}
                    checked={filters.facilities.includes('restroom')}
                  />
                  公共廁所
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    value="parking"
                    onChange={handleFilterChange}
                    checked={filters.facilities.includes('parking')}
                  />
                  停車場
                </label>
              </div>
            </div>
            
            <button onClick={applyFilters} className="apply-btn">套用篩選</button>
          </div>
        </div>
        
        {/* 推薦公園列表 */}
        <div className="park-section">
          <h2>推薦公園</h2>
          <div className="park-list">
            {recommendedParks.length > 0 ? (
              recommendedParks.map(park => (
                <div key={park._id} className="park-card">
                  <h3>{park.name}</h3>
                  <p>{park.address}</p>
                  <div className="park-tags">
                    {park.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <Link to={`/park/${park._id}`} className="view-btn">查看詳情</Link>
                </div>
              ))
            ) : (
              <p className="empty-message">沒有符合條件的公園</p>
            )}
          </div>
        </div>
        
        {/* 最近去過的公園 */}
        {recentParks.length > 0 && (
          <div className="park-section">
            <h2>最近去過的公園</h2>
            <div className="park-list">
              {recentParks.map(park => (
                <div key={park._id} className="park-card">
                  <h3>{park.name}</h3>
                  <p>{park.address}</p>
                  <Link to={`/park/${park._id}`} className="view-btn">查看詳情</Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 附近公園 */}
        <div className="park-section">
          <h2>附近公園</h2>
          <div className="park-list">
            {nearbyParks.length > 0 ? (
              nearbyParks.map(park => (
                <div key={park._id} className="park-card">
                  <h3>{park.name}</h3>
                  <p>{park.address}</p>
                  <Link to={`/park/${park._id}`} className="view-btn">查看詳情</Link>
                </div>
              ))
            ) : (
              <p className="empty-message">正在載入附近公園...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;