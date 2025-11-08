import React from 'react';

interface StressGaugeProps {
  percentage: number;
}

const StressGauge: React.FC<StressGaugeProps> = ({ percentage }) => {
  const size = 250;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getStatus = () => {
    if (percentage < 30) return { text: "Relaxed", color: "text-green-400" };
    if (percentage < 60) return { text: "Moderate", color: "text-yellow-400" };
    return { text: "High Stress", color: "text-red-400" };
  };

  const status = getStatus();

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-slate-700"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={`stroke-current ${status.color} transition-all duration-500 ease-out`}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-5xl font-bold transition-colors duration-300 ${status.color}`}>
          {Math.round(percentage)}%
        </span>
        <span className={`mt-1 text-lg font-semibold ${status.color}`}>{status.text}</span>
      </div>
    </div>
  );
};

export default StressGauge;
