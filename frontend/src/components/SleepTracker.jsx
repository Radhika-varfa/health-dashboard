import React from 'react';
import { FaBed } from 'react-icons/fa';

const SleepTracker = ({ value, onChange }) => {
  const quality = value >= 7 ? 'Good' : value >= 5 ? 'Average' : 'Poor';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaBed className="text-purple-500 text-2xl" />
          <h3 className="text-lg font-semibold text-gray-700">Sleep</h3>
        </div>
        <span className="text-sm text-gray-500">Recommended: 7-8h</span>
      </div>

      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="12"
          step="0.5"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">0h</span>
          <span className="text-sm text-gray-500">4h</span>
          <span className="text-sm text-gray-500">8h</span>
          <span className="text-sm text-gray-500">12h</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold text-purple-600">{value}h</p>
        <p className="text-sm text-gray-500 mt-1">
          Sleep Quality: <span className={`font-semibold ${
            quality === 'Good' ? 'text-green-500' : quality === 'Average' ? 'text-yellow-500' : 'text-red-500'
          }`}>{quality}</span>
        </p>
      </div>
    </div>
  );
};

export default SleepTracker;