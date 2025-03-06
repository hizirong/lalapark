// backend/models/Park.js
const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [經度, 緯度]
        required: true,
      },
    },
    // 各種屬性標籤，如狗狗友善、遮雨空間、適合野餐、適合帶小孩等
    tags: [
      {
        type: String,
      },
    ],
    // 其他資訊: 圖片、地址、介紹
    address: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// 建立地理空間索引以利地理查詢
parkSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Park', parkSchema);
