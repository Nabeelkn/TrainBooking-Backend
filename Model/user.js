// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash user password before saving to database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  const hash = await bcrypt.hash(user.password, saltRounds);
  user.password = hash;
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
