// routes/auth.js

const express = require('express');
const User = require('../Model/user');
const router = express.Router();


// Route for user registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
console.log(email)
  try {
    const existingUser = await User.findOne({ email:email });
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error',error });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(406).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
