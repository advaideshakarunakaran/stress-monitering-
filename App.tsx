
import React from 'react';
import { useVitals } from './hooks/useVitals';
import MetricCard from './components/MetricCard';
import StressGauge from './components/StressGauge';
import DataChart from './components/DataChart';
import { HeartIcon, LungsIcon, PulseIcon } from './constants';

const App: React.FC = () => {
  const { vitals, stressLevel, history } = useVitals();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Real-Time Stress Monitor</h1>
          <p className="text-slate-400 mt-2">Your personal wellness dashboard.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <MetricCard
              label="Heart Rate"
              value={vitals.heartRate.toFixed(0)}
              unit="BPM"
              icon={<HeartIcon />}
            />
            <MetricCard
              label="Pulse Rate"
              value={vitals.heartRate.toFixed(0)} 
              unit="BPM"
              icon={<PulseIcon />}
            />
            <MetricCard
              label="Oxygen Level"
              value={vitals.oxygenLevel.toFixed(1)}
              unit="SpO₂ %"
              icon={<LungsIcon />}
            />
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] lg:min-h-0 backdrop-blur-sm border border-slate-700 shadow-2xl shadow-cyan-500/10">
            <h2 className="text-2xl font-semibold text-slate-300 mb-4">Current Stress Level</h2>
            <StressGauge percentage={stressLevel} />
          </div>

          <div className="lg:col-span-3 bg-slate-800/50 rounded-2xl p-4 sm:p-6 mt-4 backdrop-blur-sm border border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-300 mb-4 ml-2">Vitals History</h2>
            <DataChart data={history} />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>This application provides simulated data for demonstration purposes only.</p>
            <p>&copy; 2024 Wellness Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
