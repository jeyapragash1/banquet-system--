import React from 'react';

const StatCard = ({ title, value, icon, change, changeType, timeframe }) => {
  const isPositive = changeType === 'positive';
  return (
    // STYLE CHANGE: Background, border instead of shadow
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex justify-between items-center">
      <div>
        {/* STYLE CHANGE: Text colors */}
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <div className="flex items-center mt-2">
          {/* STYLE CHANGE: Change text is brighter */}
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {change}
          </span>
          <span className="text-xs text-gray-500 ml-2">{timeframe}</span>
        </div>
      </div>
      {/* STYLE CHANGE: Icon background */}
      <div className="bg-gray-700 p-4 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;