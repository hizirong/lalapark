// frontend/src/pages/Dashboard.js
import React, { useState } from 'react';
import { fetchRecommendedParks } from '../services/api';

function Dashboard() {
  const [purpose, setPurpose] = useState('dog_walking');
  const [recommendedParks, setRecommendedParks] = useState([]);

  const handleRecommend = async () => {
    // 假設使用 HTML5 Geolocation 獲取經緯度
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const { data } = await fetchRecommendedParks(purpose, lat, lng);
      setRecommendedParks(data);
    });
  };

  return (
    <div>
      <h2>推薦公園</h2>
      <div>
        <label>今日目的：</label>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="dog_walking">遛狗</option>
          <option value="kids_friendly">帶小孩</option>
          <option value="covered">下雨天</option>
          <option value="picnic">野餐</option>
          <option value="sunny">大太陽</option>
        </select>
        <button onClick={handleRecommend}>取得推薦</button>
      </div>
      <ul>
        {recommendedParks.map((park) => (
          <li key={park._id}>{park.name} - {park.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
