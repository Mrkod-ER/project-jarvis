// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to add a new user
router.post('/register', async (req, res) => {
  const { auth0Id, email, name } = req.body;
  try {
    const newUser = new User({ auth0Id, email, name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a user by Auth0 ID
router.get('/:auth0Id', async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.params.auth0Id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
