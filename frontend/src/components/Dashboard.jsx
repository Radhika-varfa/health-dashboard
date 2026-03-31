// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import WaterIntake from './WaterIntake';
// import SleepTracker from './SleepTracker';
// import StepsTracker from './StepsTracker';
// import BMICalculator from './BMICalculator';
// import AISuggestions from './AISuggestions';
// import WeeklyReport from './WeeklyReport';
// import { FaHeart, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

// const Dashboard = ({ token, user, setToken, setUser }) => {
//   const [healthData, setHealthData] = useState([]);
//   const [currentData, setCurrentData] = useState({
//     waterIntake: 0,
//     sleepHours: 0,
//     steps: 0,
//     weight: 70,
//     height: 170,
//     bmi: 0
//   });
//   const navigate = useNavigate();

//   const handleLogout = useCallback(() => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//     navigate('/login');
//   }, [navigate, setToken, setUser]);

//   const fetchHealthData = useCallback(async () => {
//     // Check if token exists
//     if (!token) {
//       console.error('No token found');
//       handleLogout();
//       return;
//     }

//     try {
//       console.log('Fetching health data with token:', token.substring(0, 20) + '...'); // Debug log
      
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health-data`, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       console.log('Health data fetched:', response.data);
//       setHealthData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       console.error('Error response:', error.response);
      
//       if (error.response?.status === 401) {
//         console.error('Token invalid or expired, logging out');
//         handleLogout();
//       }
//     }
//   }, [token, handleLogout]);

//   const saveHealthData = useCallback(async () => {
//     if (!token) {
//       console.error('No token found');
//       handleLogout();
//       return;
//     }

//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/api/health-data`, currentData, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       await fetchHealthData();
//       alert('Health data saved successfully!');
//     } catch (error) {
//       console.error('Error saving data:', error);
//       if (error.response?.status === 401) {
//         handleLogout();
//       } else {
//         alert('Error saving data. Please try again.');
//       }
//     }
//   }, [token, currentData, fetchHealthData, handleLogout]);

//   useEffect(() => {
//     console.log('Dashboard mounted, token exists:', !!token);
    
//     if (!token) {
//       console.log('No token, redirecting to login');
//       navigate('/login');
//       return;
//     }
    
//     fetchHealthData();
//   }, [token, navigate, fetchHealthData]);

//   const updateData = useCallback((field, value) => {
//     setCurrentData(prev => ({ ...prev, [field]: value }));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between flex-wrap">
//             <div className="flex items-center space-x-3">
//               <FaHeart className="text-3xl animate-pulse" />
//               <h1 className="text-2xl md:text-3xl font-bold">AI Health & Lifestyle Dashboard</h1>
//             </div>
            
//             <div className="flex items-center space-x-4 mt-2 md:mt-0">
//               <div className="flex items-center space-x-2">
//                 <FaUserCircle className="text-2xl" />
//                 <span className="font-semibold">{user?.name}</span>
//               </div>
//               <button
//                 onClick={saveHealthData}
//                 className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition shadow-md text-sm md:text-base"
//               >
//                 Save Today's Data
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow-md flex items-center space-x-2 text-sm md:text-base"
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <WaterIntake value={currentData.waterIntake} onChange={(v) => updateData('waterIntake', v)} />
//           <SleepTracker value={currentData.sleepHours} onChange={(v) => updateData('sleepHours', v)} />
//           <StepsTracker value={currentData.steps} onChange={(v) => updateData('steps', v)} />
//           <BMICalculator 
//             weight={currentData.weight} 
//             height={currentData.height}
//             onBMIChange={(bmi) => updateData('bmi', bmi)}
//             onWeightChange={(w) => updateData('weight', w)}
//             onHeightChange={(h) => updateData('height', h)}
//           />
//         </div>

//         {/* AI Suggestions & Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <AISuggestions healthData={currentData} />
//           <WeeklyReport healthData={healthData} />
//         </div>

//         {/* Motivational Quote */}
//         <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl p-6 text-white text-center shadow-lg">
//           <p className="text-xl font-semibold">"Your health is an investment, not an expense."</p>
//           <p className="text-sm mt-2">Keep track daily for a healthier lifestyle!</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WaterIntake from './WaterIntake';
import SleepTracker from './SleepTracker';
import StepsTracker from './StepsTracker';
import BMICalculator from './BMICalculator';
import AISuggestions from './AISuggestions';
import WeeklyReport from './WeeklyReport';
import { FaHeart, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Dashboard = ({ token, user, setToken, setUser }) => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [currentData, setCurrentData] = useState({
    waterIntake: 0,
    sleepHours: 0,
    steps: 0,
    weight: 70,
    height: 170,
    bmi: 0
  });
  const navigate = useNavigate();

  // ─── Helper: always get the most up-to-date token ───────────────────────────
  // The `token` prop can be null for a few render cycles right after login
  // because React state propagation is async. Reading directly from localStorage
  // guarantees we have the real value immediately.
  const getActiveToken = useCallback(() => {
    return token || localStorage.getItem('token');
  }, [token]);

  // ─── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate, setToken, setUser]);

  // ─── Fetch health data ───────────────────────────────────────────────────────
  const fetchHealthData = useCallback(async () => {
    const activeToken = getActiveToken();

    if (!activeToken) {
      console.log('No token available, skipping fetch');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching health data...');

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/health-data`,
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('Health data fetched successfully:', response.data);
      setHealthData(response.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);

      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your connection.');
      } else if (err.response?.status === 401) {
        // ── KEY FIX ──────────────────────────────────────────────────────────
        // Only truly log out when the token is missing from localStorage too.
        // A 401 can fire during the race-condition window when the prop hasn't
        // arrived yet even though a valid token is stored locally.
        // ─────────────────────────────────────────────────────────────────────
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          console.warn('Token missing from storage — logging out');
          handleLogout();
        } else {
          console.warn('Got 401 but token exists in storage — may be a server issue');
          setError('Session error. Please try refreshing the page.');
        }
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Please contact support.');
      } else if (err.request) {
        setError('Cannot connect to server. Please check your internet connection.');
      } else {
        setError('Failed to load health data. Please refresh the page.');
      }
    } finally {
      setLoading(false);
    }
  }, [getActiveToken, handleLogout]);

  // ─── Save health data ────────────────────────────────────────────────────────
  const saveHealthData = useCallback(async () => {
    const activeToken = getActiveToken();

    if (!activeToken) {
      console.error('No token found');
      handleLogout();
      return;
    }

    try {
      setSaving(true);
      setError(null);

      console.log('Saving health data...', currentData);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/health-data`,
        currentData,
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      alert('Health data saved successfully!');
      await fetchHealthData();
    } catch (err) {
      console.error('Error saving data:', err);

      if (err.response?.status === 401) {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          handleLogout();
        } else {
          alert('Session error. Please refresh the page and try again.');
        }
      } else if (err.code === 'ECONNABORTED') {
        alert('Request timeout. Please try again.');
      } else if (err.request) {
        alert('Cannot connect to server. Please check your connection.');
      } else {
        alert('Error saving data. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  }, [getActiveToken, currentData, fetchHealthData, handleLogout]);

  // ─── On mount / token change ─────────────────────────────────────────────────
  // ── KEY FIX ──────────────────────────────────────────────────────────────────
  // Removed the unreliable 100 ms setTimeout.
  // We check localStorage synchronously so there is no delay-based race condition.
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const activeToken = getActiveToken();

    if (!activeToken) {
      console.log('No token found — redirecting to login');
      navigate('/login');
      return;
    }

    console.log('Token found, fetching health data');
    fetchHealthData();
  }, [token, navigate, fetchHealthData, getActiveToken]);

  // ─── Update a single field in currentData ────────────────────────────────────
  const updateData = useCallback((field, value) => {
    setCurrentData(prev => ({ ...prev, [field]: value }));
  }, []);

  // ─── Loading state ────────────────────────────────────────────────────────────
  if (loading && healthData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ─── Error state ──────────────────────────────────────────────────────────────
  if (error && healthData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchHealthData();
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={handleLogout}
            className="ml-3 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ─── Dashboard UI ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center space-x-3">
              <FaHeart className="text-3xl animate-pulse" />
              <h1 className="text-2xl md:text-3xl font-bold">AI Health &amp; Lifestyle Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-2xl" />
                <span className="font-semibold">{user?.name || 'User'}</span>
              </div>
              <button
                onClick={saveHealthData}
                disabled={saving}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition shadow-md text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : "Save Today's Data"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow-md flex items-center space-x-2 text-sm md:text-base"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Inline error banner (when data already loaded but a refresh failed) */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => { setError(null); fetchHealthData(); }}
              className="ml-4 text-sm underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <WaterIntake value={currentData.waterIntake} onChange={(v) => updateData('waterIntake', v)} />
          <SleepTracker value={currentData.sleepHours} onChange={(v) => updateData('sleepHours', v)} />
          <StepsTracker value={currentData.steps} onChange={(v) => updateData('steps', v)} />
          <BMICalculator
            weight={currentData.weight}
            height={currentData.height}
            onBMIChange={(bmi) => updateData('bmi', bmi)}
            onWeightChange={(w) => updateData('weight', w)}
            onHeightChange={(h) => updateData('height', h)}
          />
        </div>

        {/* AI Suggestions & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AISuggestions healthData={currentData} />
          <WeeklyReport healthData={healthData} />
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl p-6 text-white text-center shadow-lg">
          <p className="text-xl font-semibold">"Your health is an investment, not an expense."</p>
          <p className="text-sm mt-2">Keep track daily for a healthier lifestyle!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;