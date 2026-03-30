const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', healthRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Health Dashboard API is running!' });
});

// AI Suggestions Route (No Auth Needed for suggestions)
app.post('/api/ai-suggestions', async (req, res) => {
  try {
    const { waterIntake, sleepHours, steps, bmi } = req.body;
    
    const suggestions = generateSmartSuggestions({
      waterIntake: waterIntake || 0,
      sleepHours: sleepHours || 0,
      steps: steps || 0,
      bmi: bmi || 0
    });
    
    res.json({ suggestions });
  } catch (error) {
    console.error('Error:', error);
    res.json({ suggestions: "Click 'Get AI Suggestions' to get personalized health recommendations!" });
  }
});

function generateSmartSuggestions(data) {
  let suggestions = "🏥 **YOUR PERSONALIZED HEALTH REPORT**\n\n";
  
  if (data.waterIntake < 2000 && data.waterIntake > 0) {
    suggestions += `💧 **Hydration Alert**: You're drinking ${data.waterIntake}ml water. Aim for 2000-3000ml daily.\n`;
    suggestions += `   → Set reminders every 2 hours to drink water\n\n`;
  } else if (data.waterIntake >= 2000 && data.waterIntake <= 3000) {
    suggestions += `💧 **Great Hydration**: Excellent! You're meeting your water goals.\n\n`;
  }
  
  if (data.sleepHours < 6 && data.sleepHours > 0) {
    suggestions += `😴 **Sleep Deprivation**: Only ${data.sleepHours} hours of sleep.\n`;
    suggestions += `   → Aim for 7-8 hours for optimal health\n\n`;
  } else if (data.sleepHours >= 7 && data.sleepHours <= 9) {
    suggestions += `😊 **Optimal Sleep**: ${data.sleepHours} hours is perfect!\n\n`;
  }
  
  if (data.steps < 5000 && data.steps > 0) {
    suggestions += `🚶 **Activity Alert**: Only ${data.steps} steps today.\n`;
    suggestions += `   → Aim for 8,000-10,000 steps daily\n\n`;
  } else if (data.steps >= 8000) {
    suggestions += `🏃 **Active Day**: ${data.steps} steps! Great job!\n\n`;
  }
  
  if (data.bmi > 0) {
    if (data.bmi < 18.5) {
      suggestions += `🍎 **BMI: ${data.bmi}** (Underweight) - Focus on nutrient-rich foods\n\n`;
    } else if (data.bmi >= 18.5 && data.bmi <= 24.9) {
      suggestions += `💪 **BMI: ${data.bmi}** (Healthy) - Keep up the good work!\n\n`;
    } else if (data.bmi >= 25) {
      suggestions += `⚖️ **BMI: ${data.bmi}** - Focus on balanced diet and exercise\n\n`;
    }
  }
  
  suggestions += `🍽️ **DIET**: Include fruits, vegetables, lean proteins, and whole grains\n`;
  suggestions += `💪 **WORKOUT**: 30 mins cardio + 15 mins strength training, 4-5x/week\n`;
  suggestions += `✨ **MOTIVATION**: Small steps every day lead to big changes!`;
  
  return suggestions;
}

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/health_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
})
.catch(err => {
  console.log('⚠️ MongoDB Connection Error:', err.message);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health Dashboard API ready!`);
});