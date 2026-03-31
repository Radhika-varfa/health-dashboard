// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaBrain, FaSpinner } from 'react-icons/fa';

// const AISuggestions = ({ healthData }) => {
//   const [suggestions, setSuggestions] = useState('');
//   const [loading, setLoading] = useState(false);

//   const getAISuggestions = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/ai-suggestions`, healthData);
//       setSuggestions(response.data.suggestions);
//     } catch (error) {
//       console.error('Error getting AI suggestions:', error);
//       setSuggestions('Unable to fetch AI suggestions. Please try again later.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//         <div className="flex items-center space-x-2">
//           <FaBrain className="text-purple-500 text-2xl" />
//           <h3 className="text-lg font-semibold text-gray-700">AI Health Assistant</h3>
//         </div>
//         <button
//           onClick={getAISuggestions}
//           disabled={loading}
//           className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
//         >
//           {loading ? <FaSpinner className="animate-spin" /> : 'Get AI Suggestions'}
//         </button>
//       </div>
      
//       {suggestions && (
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4">
//           <div className="whitespace-pre-wrap text-gray-700 text-sm md:text-base">
//             {suggestions}
//           </div>
//         </div>
//       )}
      
//       {!suggestions && !loading && (
//         <div className="text-center py-8 text-gray-500">
//           <p>Click the button above to get personalized AI health recommendations!</p>
//           <p className="text-sm mt-2">Based on your daily health data</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AISuggestions;
import React, { useState } from 'react';
import axios from 'axios';

const AISuggestions = ({ healthData }) => {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAISuggestions = async () => {
    setLoading(true);
    setError('');
    
    try {
      // ✅ FIXED: Add /api prefix to match backend route
      const apiUrl = process.env.REACT_APP_API_URL;
      const endpoint = `${apiUrl}/api/ai-suggestions`;  // Note the /api/ prefix
      
      console.log('Calling AI suggestions at:', endpoint);
      
      const response = await axios.post(endpoint, {
        waterIntake: healthData.waterIntake || 0,
        sleepHours: healthData.sleepHours || 0,
        steps: healthData.steps || 0,
        bmi: healthData.bmi || 0
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000
      });
      
      console.log('AI suggestions received:', response.data);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      
      if (error.response?.status === 404) {
        setError('API endpoint not found. Please check if backend is running.');
        setSuggestions('The AI service endpoint is not available. Please contact support.');
      } else if (error.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your connection.');
        setSuggestions('The request took too long. Please try again.');
      } else if (error.request) {
        setError('Cannot connect to server. Please check your internet connection.');
        setSuggestions('Unable to reach the AI service. Please check your connection.');
      } else {
        setError('Failed to get suggestions. Please try again.');
        setSuggestions('Unable to fetch AI suggestions at this moment.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">🤖 AI Health Assistant</h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Powered by AI
        </div>
      </div>
      
      <button
        onClick={getAISuggestions}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing your health data...
          </span>
        ) : (
          'Get AI Health Suggestions'
        )}
      </button>
      
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-sm">
          ⚠️ {error}
        </div>
      )}
      
      {suggestions && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
            {suggestions}
          </div>
        </div>
      )}
      
      {!suggestions && !loading && !error && (
        <div className="text-center text-gray-500 text-sm py-8">
          💡 Click the button above to get personalized health recommendations based on your daily data
        </div>
      )}
    </div>
  );
};

export default AISuggestions;