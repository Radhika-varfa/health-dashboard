import React, { useState } from 'react';
import axios from 'axios';
import { FaBrain, FaSpinner } from 'react-icons/fa';

const AISuggestions = ({ healthData }) => {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const getAISuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ai-suggestions`, healthData);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      setSuggestions('Unable to fetch AI suggestions. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <FaBrain className="text-purple-500 text-2xl" />
          <h3 className="text-lg font-semibold text-gray-700">AI Health Assistant</h3>
        </div>
        <button
          onClick={getAISuggestions}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin" /> : 'Get AI Suggestions'}
        </button>
      </div>
      
      {suggestions && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4">
          <div className="whitespace-pre-wrap text-gray-700 text-sm md:text-base">
            {suggestions}
          </div>
        </div>
      )}
      
      {!suggestions && !loading && (
        <div className="text-center py-8 text-gray-500">
          <p>Click the button above to get personalized AI health recommendations!</p>
          <p className="text-sm mt-2">Based on your daily health data</p>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;