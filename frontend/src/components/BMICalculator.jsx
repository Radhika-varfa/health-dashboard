import React, { useEffect, useCallback } from 'react';
import { FaWeight, FaRuler } from 'react-icons/fa';

const BMICalculator = ({ weight, height, onBMIChange, onWeightChange, onHeightChange }) => {
  const calculateBMI = useCallback(() => {
    if (weight && height && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return '0';
  }, [weight, height]);

  useEffect(() => {
    const bmi = calculateBMI();
    onBMIChange(parseFloat(bmi));
  }, [calculateBMI, onBMIChange]);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-100' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-500', bg: 'bg-green-100' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-100' };
    return { text: 'Obese', color: 'text-red-500', bg: 'bg-red-100' };
  };

  const bmi = calculateBMI();
  const category = getBMICategory(bmi);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">BMI Calculator</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-gray-600 mb-2">
            <FaWeight />
            <span>Weight (kg)</span>
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(parseFloat(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="flex items-center space-x-2 text-gray-600 mb-2">
            <FaRuler />
            <span>Height (cm)</span>
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(parseFloat(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className={`${category.bg} rounded-lg p-4 text-center`}>
          <p className="text-sm text-gray-600">Your BMI</p>
          <p className="text-3xl font-bold text-gray-800">{bmi}</p>
          <p className={`font-semibold ${category.color}`}>{category.text}</p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;