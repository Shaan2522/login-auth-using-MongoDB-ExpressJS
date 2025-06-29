const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Only required for local login
  provider: { type: String, required: false }, // 'google', 'github', or undefined for local
  oauthId: { type: String, required: false } // OAuth provider user id
});

module.exports = mongoose.model('User', userSchema);
