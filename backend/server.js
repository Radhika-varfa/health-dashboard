// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());

// // MongoDB Connection
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/health_dashboard', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ MongoDB Connected Successfully');
// })
// .catch(err => {
//   console.log('⚠️ MongoDB Connection Error:', err.message);
// });

// // ============= TOKEN VERIFICATION MIDDLEWARE =============
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader) {
//     console.log('❌ No authorization header');
//     return res.status(401).json({ error: 'No token provided' });
//   }
  
//   const token = authHeader.split(' ')[1];
  
//   if (!token) {
//     console.log('❌ Invalid token format');
//     return res.status(401).json({ error: 'Invalid token format' });
//   }
  
//   try {
//     const jwt = require('jsonwebtoken');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
//     req.userId = decoded.id;
//     console.log('✅ Token verified for user:', req.userId);
//     next();
//   } catch (error) {
//     console.error('❌ Token verification error:', error.message);
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// // ============= AUTH ROUTES =============

// // Register Route
// app.post('/auth/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     const User = require('./models/User');
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists with this email' });
//     }
    
//     const user = new User({ name, email, password });
//     await user.save();
    
//     const jwt = require('jsonwebtoken');
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '7d' }
//     );
    
//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Registration failed: ' + error.message });
//   }
// });

// // Login Route
// app.post('/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const User = require('./models/User');
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
    
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
    
//     const jwt = require('jsonwebtoken');
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '7d' }
//     );
    
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Login failed: ' + error.message });
//   }
// });

// // ============= PROTECTED HEALTH DATA ROUTES =============
// // These routes REQUIRE token verification

// // GET health data
// app.get('/api/health-data', verifyToken, async (req, res) => {
//   try {
//     const HealthData = require('./models/HealthData');
//     const data = await HealthData.find({ userId: req.userId }).sort({ date: -1 });
//     console.log(`📊 Fetched ${data.length} records for user ${req.userId}`);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching health data:', error);
//     res.status(500).json({ error: 'Failed to fetch health data' });
//   }
// });

// // POST health data
// app.post('/api/health-data', verifyToken, async (req, res) => {
//   try {
//     const HealthData = require('./models/HealthData');
//     const healthData = new HealthData({
//       userId: req.userId,
//       waterIntake: req.body.waterIntake || 0,
//       sleepHours: req.body.sleepHours || 0,
//       steps: req.body.steps || 0,
//       weight: req.body.weight || 70,
//       height: req.body.height || 170,
//       bmi: req.body.bmi || 0,
//       date: new Date()
//     });
    
//     await healthData.save();
//     console.log(`💾 Saved health data for user ${req.userId}`);
//     res.status(201).json(healthData);
//   } catch (error) {
//     console.error('Error saving health data:', error);
//     res.status(500).json({ error: 'Failed to save health data: ' + error.message });
//   }
// });

// // AI Suggestions Route (No Auth Needed)
// app.post('/api/ai-suggestions', async (req, res) => {
//   try {
//     const { waterIntake, sleepHours, steps, bmi } = req.body;
    
//     const suggestions = generateSmartSuggestions({
//       waterIntake: waterIntake || 0,
//       sleepHours: sleepHours || 0,
//       steps: steps || 0,
//       bmi: bmi || 0
//     });
    
//     res.json({ suggestions });
//   } catch (error) {
//     console.error('Error:', error);
//     res.json({ suggestions: "Click 'Get AI Suggestions' to get personalized health recommendations!" });
//   }
// });

// // Test route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Health Dashboard API is running!',
//     endpoints: {
//       auth: {
//         register: 'POST /auth/register',
//         login: 'POST /auth/login'
//       },
//       api: {
//         suggestions: 'POST /api/ai-suggestions',
//         healthData: 'GET/POST /api/health-data (requires Bearer token)'
//       }
//     }
//   });
// });

// // Health check route
// app.get('/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// function generateSmartSuggestions(data) {
//   let suggestions = "🏥 **YOUR PERSONALIZED HEALTH REPORT**\n\n";
  
//   if (data.waterIntake < 2000 && data.waterIntake > 0) {
//     suggestions += `💧 **Hydration Alert**: You're drinking ${data.waterIntake}ml water. Aim for 2000-3000ml daily.\n`;
//     suggestions += `   → Set reminders every 2 hours to drink water\n\n`;
//   } else if (data.waterIntake >= 2000 && data.waterIntake <= 3000) {
//     suggestions += `💧 **Great Hydration**: Excellent! You're meeting your water goals.\n\n`;
//   }
  
//   if (data.sleepHours < 6 && data.sleepHours > 0) {
//     suggestions += `😴 **Sleep Deprivation**: Only ${data.sleepHours} hours of sleep.\n`;
//     suggestions += `   → Aim for 7-8 hours for optimal health\n\n`;
//   } else if (data.sleepHours >= 7 && data.sleepHours <= 9) {
//     suggestions += `😊 **Optimal Sleep**: ${data.sleepHours} hours is perfect!\n\n`;
//   }
  
//   if (data.steps < 5000 && data.steps > 0) {
//     suggestions += `🚶 **Activity Alert**: Only ${data.steps} steps today.\n`;
//     suggestions += `   → Aim for 8,000-10,000 steps daily\n\n`;
//   } else if (data.steps >= 8000) {
//     suggestions += `🏃 **Active Day**: ${data.steps} steps! Great job!\n\n`;
//   }
  
//   if (data.bmi > 0) {
//     if (data.bmi < 18.5) {
//       suggestions += `🍎 **BMI: ${data.bmi}** (Underweight) - Focus on nutrient-rich foods\n\n`;
//     } else if (data.bmi >= 18.5 && data.bmi <= 24.9) {
//       suggestions += `💪 **BMI: ${data.bmi}** (Healthy) - Keep up the good work!\n\n`;
//     } else if (data.bmi >= 25) {
//       suggestions += `⚖️ **BMI: ${data.bmi}** - Focus on balanced diet and exercise\n\n`;
//     }
//   }
  
//   suggestions += `🍽️ **DIET**: Include fruits, vegetables, lean proteins, and whole grains\n`;
//   suggestions += `💪 **WORKOUT**: 30 mins cardio + 15 mins strength training, 4-5x/week\n`;
//   suggestions += `✨ **MOTIVATION**: Small steps every day lead to big changes!`;
  
//   return suggestions;
// }

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
//   console.log(`📊 Health Dashboard API ready!`);
//   console.log(`🔐 Auth endpoints: /auth/login, /auth/register`);
//   console.log(`🔒 Protected endpoints: /api/health-data (requires valid token)`);
//   console.log(`🎯 Public endpoints: /api/ai-suggestions`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 🔥🔥🔥 VERY IMPORTANT FIX (PREVENT 304 CACHE ISSUE)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');   // ❌ no caching
  res.set('Pragma', 'no-cache');          // extra safety
  res.set('Expires', '0');
  next();
});

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

// ============= TOKEN VERIFICATION MIDDLEWARE =============
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }
  
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ============= AUTH ROUTES =============

// Register
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const User = require('./models/User');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = new User({ name, email, password });
    await user.save();
    
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const User = require('./models/User');
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// ============= HEALTH DATA ROUTES =============

// GET
app.get('/api/health-data', verifyToken, async (req, res) => {
  try {
    const HealthData = require('./models/HealthData');

    const data = await HealthData
      .find({ userId: req.userId })
      .sort({ date: -1 });

    res.status(200).json(data); // ✅ always send fresh data

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health data' });
  }
});

// POST
app.post('/api/health-data', verifyToken, async (req, res) => {
  try {
    const HealthData = require('./models/HealthData');

    const newData = new HealthData({
      userId: req.userId,
      ...req.body,
      date: new Date()
    });

    await newData.save();

    res.status(201).json(newData);

  } catch (error) {
    res.status(500).json({ error: 'Failed to save health data' });
  }
});

// AI Suggestions
app.post('/api/ai-suggestions', (req, res) => {
  res.json({ suggestions: "AI Suggestions working..." });
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});