// backend/routes/parkRoutes.js
const express = require('express');
const router = express.Router();
const parkController = require('../controllers/parkController');

// 取得所有公園列表
router.get('/', parkController.getAllParks);

// 根據當天天氣與用途推薦公園
router.get('/recommend', parkController.recommendParks);

// 新增或編輯公園 (管理員或需要權限)
router.post('/', parkController.createPark);
router.put('/:parkId', parkController.updatePark);
router.delete('/:parkId', parkController.deletePark);

module.exports = router;
