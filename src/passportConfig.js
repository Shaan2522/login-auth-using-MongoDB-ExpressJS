const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

function setupPassportStrategies(passport) {
  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0].value;
      const name = profile.displayName;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ email, name, oauthProvider: 'google' });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  // GitHub OAuth Strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: ['user:email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // GitHub may not always provide email in profile.emails, so fallback to profile._json.email
      let email = (profile.emails && profile.emails[0].value) || profile._json.email;
      const name = profile.displayName || profile.username;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ email, name, oauthProvider: 'github' });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
}

module.exports = setupPassportStrategies;
