const express = require('express');
const HealthData = require('../models/HealthData');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's health data
router.get('/health-data', auth, async (req, res) => {
  try {
    const data = await HealthData.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(7);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save health data
router.post('/health-data', auth, async (req, res) => {
  try {
    const healthData = new HealthData({
      ...req.body,
      userId: req.userId
    });
    await healthData.save();
    res.json(healthData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weekly report
router.get('/weekly-report', auth, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const data = await HealthData.find({
      userId: req.userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;