import React, { useState, useEffect } from 'react';
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
  const [currentData, setCurrentData] = useState({
    waterIntake: 0,
    sleepHours: 0,
    steps: 0,
    weight: 70,
    height: 170,
    bmi: 0
  });
  const navigate = useNavigate();

  // Configure axios with auth token
  const axiosInstance = axios.create({
    baseURL: process.env.baseurl,
    headers: { Authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchHealthData();
  }, [token]);

  const fetchHealthData = async () => {
    try {
      const response = await axiosInstance.get('/health-data');
      setHealthData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const saveHealthData = async () => {
    try {
      await axiosInstance.post('/health-data', currentData);
      fetchHealthData();
      alert('Health data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const updateData = (field, value) => {
    setCurrentData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center space-x-3">
              <FaHeart className="text-3xl animate-pulse" />
              <h1 className="text-2xl md:text-3xl font-bold">AI Health & Lifestyle Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-2xl" />
                <span className="font-semibold">{user?.name}</span>
              </div>
              <button
                onClick={saveHealthData}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition shadow-md text-sm md:text-base"
              >
                Save Today's Data
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