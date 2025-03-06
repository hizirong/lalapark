// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport'); // 確保載入 Passport 設置

// Google 登入 (redirect)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google 登入回調
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login', // 登入失敗時導回前端
    successRedirect: 'http://localhost:3000/dashboard', // 登入成功時導回前端
  })
);

// 登出
router.get('/logout', (req, res) => {
  req.logout(); // Passport 提供的登出方式
  res.redirect('http://localhost:3000/'); // 回到首頁
});

module.exports = router;
