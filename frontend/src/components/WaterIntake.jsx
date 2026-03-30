// import React from 'react';
// import { FaTint } from 'react-icons/fa';

// const WaterIntake = ({ value, onChange }) => {
//   const glasses = Math.floor(value / 250);
//   const target = 2000; // 2 liters target

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-2">
//           <FaTint className="text-blue-500 text-2xl" />
//           <h3 className="text-lg font-semibold text-gray-700">Water Intake</h3>
//         </div>
//         <span className="text-sm text-gray-500">Target: 2L</span>
//       </div>
      
//       <div className="mb-4">
//         <div className="flex justify-between mb-2">
//           <span className="text-gray-600">Today's Intake</span>
//           <span className="font-bold text-blue-600">{value}ml</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-3">
//           <div 
//             className="bg-blue-500 h-3 rounded-full transition-all duration-500"
//             style={{ width: `${Math.min((value / target) * 100, 100)}%` }}
//           ></div>
//         </div>
//       </div>

//       <div className="grid grid-cols-4 gap-2">
//         {[1, 2, 3, 4].map(glass => (
//           <button
//             key={glass}
//             onClick={() => onChange(value + 250)}
//             className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition font-semibold"
//           >
//             +{glass} 🥛
//           </button>
//         ))}
//       </div>
      
//       <p className="text-sm text-gray-500 mt-3 text-center">
//         {glasses} glasses consumed • {target - value}ml to go
//       </p>
//     </div>
//   );
// };

// export default WaterIntake;



import React from 'react';
import { FaTint, FaUndo } from 'react-icons/fa';

const WaterIntake = ({ value, onChange }) => {
  const glasses = Math.floor(value / 250);
  const target = 2000; // 2 liters target
  const percentage = Math.min((value / target) * 100, 100);

  const addWater = (glassesCount) => {
    const amountToAdd = glassesCount * 250;
    onChange(value + amountToAdd);
  };

  const resetWater = () => {
    if (window.confirm('Reset water intake to 0?')) {
      onChange(0);
    }
  };

  const setCustomWater = () => {
    const amount = prompt('Enter water amount in ml:', value);
    if (amount !== null && !isNaN(amount)) {
      onChange(parseInt(amount));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaTint className="text-blue-500 text-2xl" />
          <h3 className="text-lg font-semibold text-gray-700">Water Intake</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={setCustomWater}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
            title="Set custom amount"
          >
            ✏️ Custom
          </button>
          <button
            onClick={resetWater}
            className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
            title="Reset"
          >
            <FaUndo className="inline" /> Reset
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Today's Intake</span>
          <span className="font-bold text-blue-600">{value}ml / {target}ml</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          {percentage.toFixed(0)}% of daily goal
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <button
          onClick={() => addWater(1)}
          className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-lg"
        >
          +1 Glass (250ml)
        </button>
        <button
          onClick={() => addWater(2)}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
        >
          +2 Glasses (500ml)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => addWater(3)}
          className="bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold text-lg"
        >
          +3 Glasses (750ml)
        </button>
        <button
          onClick={() => addWater(4)}
          className="bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition font-semibold text-lg"
        >
          +4 Glasses (1000ml)
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700 text-center">
          {value >= target ? '🎉 Goal achieved! Great job!' : 
            `${Math.ceil((target - value) / 250)} more glass${Math.ceil((target - value) / 250) !== 1 ? 'es' : ''} to reach your goal`}
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          💡 Tip: Drink water every 2 hours for optimal hydration
        </p>
      </div>
    </div>
  );
};

export default WaterIntake;