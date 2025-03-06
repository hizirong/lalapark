// backend/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const { MONGO_URI, PORT, SESSION_SECRET } = process.env;
const userRoutes = require('./routes/userRoutes');
const parkRoutes = require('./routes/parkRoutes');

// 連接 MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());

// 設置 Session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport 初始化
app.use(passport.initialize());
app.use(passport.session());

// 路由
app.use('/api/users', userRoutes);
app.use('/api/parks', parkRoutes);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
