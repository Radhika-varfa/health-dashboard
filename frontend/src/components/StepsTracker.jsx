import React from 'react';
import { FaRunning } from 'react-icons/fa';

const StepsTracker = ({ value, onChange }) => {
  const target = 10000;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaRunning className="text-green-500 text-2xl" />
          <h3 className="text-lg font-semibold text-gray-700">Steps</h3>
        </div>
        <span className="text-sm text-gray-500">Target: 10k</span>
      </div>

      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                {Math.min((value / target) * 100, 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              style={{ width: `${Math.min((value / target) * 100, 100)}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
            ></div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter steps"
        />
        <button
          onClick={() => onChange(value + 1000)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          +1k
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mt-3 text-center">
        {value >= target ? '🎉 Goal achieved!' : `${target - value} steps to goal`}
      </p>
    </div>
  );
};

export default StepsTracker;