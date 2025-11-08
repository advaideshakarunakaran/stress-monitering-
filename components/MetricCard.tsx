
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, icon }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl flex items-center justify-between backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-cyan-500/10 transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <div className="bg-slate-700/50 p-3 rounded-full">
          {icon}
        </div>
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white transition-all duration-300">{value}</span>
            <span className="text-slate-300">{unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
