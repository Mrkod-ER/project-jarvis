// routes/timetable.js
const express = require('express');
const Timetable = require('../models/timetable');
const router = express.Router();

// Add or update the timetable for a user
router.post('/timetable', async (req, res) => {
  const { userId, weekSchedule } = req.body;
  
  try {
    const existingTimetable = await Timetable.findOne({ userId });
    if (existingTimetable) {
      // If timetable exists, update it
      existingTimetable.weekSchedule = weekSchedule;
      await existingTimetable.save();
      return res.json(existingTimetable);
    }
    
    // Create a new timetable if not found
    const newTimetable = new Timetable({ userId, weekSchedule });
    await newTimetable.save();
    res.json(newTimetable);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get timetable for a specific user
router.get('/timetable/:userId', async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ userId: req.params.userId });
    if (!timetable) {
      return res.status(404).send('Timetable not found');
    }
    res.json(timetable);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
