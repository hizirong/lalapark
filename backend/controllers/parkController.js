// backend/controllers/parkController.js
const Park = require('../models/Park');
const weatherService = require('../services/weatherService');

// backend/controllers/parkController.js - 更新版本

// 取得所有公園，支援經緯度和距離篩選
exports.getAllParks = async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;
    
    // 若有經緯度，則進行地理位置查詢
    if (lat && lng) {
      const parks = await Park.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: parseFloat(radius) * 1000 // 轉換為公尺
          }
        }
      }).limit(20); // 限制返回數量
      
      return res.json(parks);
    }
    
    // 若沒有提供位置，則回傳所有公園
    const parks = await Park.find({}).limit(100);
    res.json(parks);
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 強化推薦公園邏輯
exports.recommendParks = async (req, res) => {
  try {
    // 從 query 中取得更多參數
    const { 
      purpose = 'general', 
      lat, 
      lng, 
      facilities = '' 
    } = req.query;
    
    const facilitiesArray = facilities ? facilities.split(',') : [];
    
    // 呼叫天氣 API
    let weather = { isRaining: false, temperature: 25 };
    
    if (lat && lng) {
      try {
        weather = await weatherService.getCurrentWeather(lat, lng);
      } catch (weatherErr) {
        console.error('獲取天氣失敗:', weatherErr);
      }
    }
    
    // 建立篩選條件
    const filter = {
      tags: { $in: [purpose] }
    };
    
    // 加入設施條件
    if (facilitiesArray.length > 0) {
      filter.tags.$in = [...filter.tags.$in, ...facilitiesArray];
    }
    
    // 天氣相關篩選
    if (weather.isRaining) {
      // 下雨天建議有遮蔽的公園
      filter.tags.$in.push('covered');
    } else if (weather.temperature > 30) {
      // 高溫建議有樹蔭的公園
      filter.tags.$in.push('shaded');
    }
    
    let recommendedParks;
    
    // 若有提供位置，進行地理位置篩選
    if (lat && lng) {
      recommendedParks = await Park.find(filter)
        .where('location')
        .near({
          center: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          maxDistance: 10000 // 10公里內
        })
        .limit(15);
    } else {
      // 無位置則只根據標籤篩選
      recommendedParks = await Park.find(filter).limit(15);
    }
    
    // 加入推薦理由
    const recommendedParksWithReason = recommendedParks.map(park => {
      const reasons = [];
      
      // 計算推薦理由
      if (park.tags.includes(purpose)) {
        reasons.push(`適合${getPurposeName(purpose)}`);
      }
      
      facilitiesArray.forEach(facility => {
        if (park.tags.includes(facility)) {
          reasons.push(`有${getFacilityName(facility)}`);
        }
      });
      
      if (weather.isRaining && park.tags.includes('covered')) {
        reasons.push('有遮雨空間');
      }
      
      return {
        ...park.toObject(),
        recommendReasons: reasons
      };
    });
    
    res.json(recommendedParksWithReason);
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 輔助函數：取得目的名稱
function getPurposeName(purpose) {
  const purposeMap = {
    'general': '一般散步',
    'dog_walking': '遛狗',
    'kids_friendly': '帶小孩',
    'picnic': '野餐',
    'exercise': '運動'
  };
  
  return purposeMap[purpose] || purpose;
}

// 輔助函數：取得設施名稱
function getFacilityName(facility) {
  const facilityMap = {
    'covered': '遮雨空間',
    'restroom': '廁所',
    'parking': '停車場',
    'shaded': '樹蔭區'
  };
  
  return facilityMap[facility] || facility;
}