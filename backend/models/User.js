// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
    },
    // 其他欄位如去過的公園
    visitedParks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Park',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
