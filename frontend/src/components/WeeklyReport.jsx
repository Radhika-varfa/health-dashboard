import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaChartLine } from 'react-icons/fa';

const WeeklyReport = ({ healthData }) => {
  const formatDataForChart = () => {
    if (!healthData || healthData.length === 0) return [];
    
    return healthData.slice().reverse().map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      water: item.waterIntake,
      sleep: item.sleepHours,
      steps: item.steps / 1000,
    }));
  };

  const chartData = formatDataForChart();

  const calculateAverage = (key) => {
    if (chartData.length === 0) return 0;
    const sum = chartData.reduce((total, item) => total + item[key], 0);
    return (sum / chartData.length).toFixed(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FaChartLine className="text-green-500 text-2xl" />
        <h3 className="text-lg font-semibold text-gray-700">Weekly Health Report</h3>
      </div>
      
      {chartData.length > 0 ? (
        <>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Water Intake & Sleep Trends</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="water" stroke="#3B82F6" name="Water (ml)" />
                <Line yAxisId="right" type="monotone" dataKey="sleep" stroke="#8B5CF6" name="Sleep (hours)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Daily Steps (thousands)</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="steps" fill="#10B981" name="Steps (k)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Weekly Summary</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Avg Steps:</p>
                <p className="font-bold text-green-600">{calculateAverage('steps')}k</p>
              </div>
              <div>
                <p className="text-gray-600">Avg Sleep:</p>
                <p className="font-bold text-purple-600">{calculateAverage('sleep')}h</p>
              </div>
              <div>
                <p className="text-gray-600">Avg Water:</p>
                <p className="font-bold text-blue-600">{calculateAverage('water')}ml</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No data available yet.</p>
          <p className="text-sm">Start tracking your health to see weekly reports!</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyReport;