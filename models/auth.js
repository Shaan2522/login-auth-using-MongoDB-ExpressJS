const bcrypt = require('bcrypt');
const User = require('./user'); // Mongoose schema
const saltRounds = 10;

async function signup(email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ email, password: hashedPassword });

  return await newUser.save();
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
}

module.exports = { signup, login };
