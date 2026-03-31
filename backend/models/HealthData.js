const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  waterIntake: {
    type: Number,
    default: 0
  },
  sleepHours: {
    type: Number,
    default: 0
  },
  steps: {
    type: Number,
    default: 0
  },
  weight: {
    type: Number,
    default: 70
  },
  height: {
    type: Number,
    default: 170
  },
  bmi: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HealthData', healthDataSchema);