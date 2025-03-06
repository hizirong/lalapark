// backend/config/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err, null));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/users/google/callback', // 與 routes 中的 callback URL 對應
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 檢查使用者是否已存在
        let existingUser = await User.findOne({ googleId: profile.id });

        if (!existingUser) {
          // 若無則建立新的使用者
          const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || '',
          });
          existingUser = await newUser.save();
        }

        return done(null, existingUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
