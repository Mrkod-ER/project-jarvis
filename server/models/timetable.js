// models/Timetable.js
const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  weekSchedule: {
    monday: [{ subject: String, time: String, classroom: String }],
    tuesday: [{ subject: String, time: String, classroom: String }],
    wednesday: [{ subject: String, time: String, classroom: String }],
    thursday: [{ subject: String, time: String, classroom: String }],
    friday: [{ subject: String, time: String, classroom: String }],
    saturday: [{ subject: String, time: String, classroom: String }],
    sunday: [{ subject: String, time: String, classroom: String }],
  },
});

module.exports = mongoose.model('Timetable', timetableSchema);
