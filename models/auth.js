const bcrypt = require('bcrypt');
const User = require('./User'); // Mongoose schema
const saltRounds = 10;

async function signup(username, password) {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ username, password: hashedPassword });

  return await newUser.save();
}

async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Username not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
}

module.exports = { signup, login };
