// backend/controllers/parkController.js
const Park = require('../models/Park');
const weatherService = require('../services/weatherService');

exports.getAllParks = async (req, res) => {
  try {
    const parks = await Park.find({});
    res.json(parks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

exports.recommendParks = async (req, res) => {
  try {
    // 從 query 中取得今天的用途和位置 (可選)
    // e.g. ?purpose=dog_walking&lat=25.0&lng=121.5
    const { purpose, lat, lng } = req.query;

    // 呼叫天氣 API
    const weather = await weatherService.getCurrentWeather(lat, lng);

    // weather 可包含: 天氣概況(晴、多雲、雨)、溫度等
    // 根據天氣和目的篩選公園
    const filter = {
      tags: { $in: [purpose] },
    };

    // 若天氣是雨天，則加上其他濾條件，如需 "有遮雨空間"
    if (weather.isRaining) {
      filter.tags.$in.push('covered');
    }

    const recommendedParks = await Park.find(filter).limit(10);
    res.json(recommendedParks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

exports.createPark = async (req, res) => {
  try {
    const { name, tags, address, description, location } = req.body;
    const newPark = new Park({
      name,
      tags,
      address,
      description,
      location,
    });
    await newPark.save();
    res.json(newPark);
  } catch (err) {
    res.status(400).json({ message: 'Create Park Failed', error: err });
  }
};

exports.updatePark = async (req, res) => {
  try {
    const { parkId } = req.params;
    const { name, tags, address, description, location } = req.body;
    const updatedPark = await Park.findByIdAndUpdate(
      parkId,
      { name, tags, address, description, location },
      { new: true }
    );
    res.json(updatedPark);
  } catch (err) {
    res.status(400).json({ message: 'Update Park Failed', error: err });
  }
};

exports.deletePark = async (req, res) => {
  try {
    const { parkId } = req.params;
    await Park.findByIdAndDelete(parkId);
    res.json({ message: 'Park deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete Park Failed', error: err });
  }
};
